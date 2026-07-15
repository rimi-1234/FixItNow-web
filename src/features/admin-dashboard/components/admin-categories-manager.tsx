"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAdminCategories, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "@/features/categories/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { formatDate } from "@/domain/formatters";
import type { Category } from "@/domain/models";

const catSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
});
type CatFormValues = z.infer<typeof catSchema>;

function CategoryForm({
  defaultValues,
  onSubmit,
  isPending,
}: {
  defaultValues?: Partial<CatFormValues>;
  onSubmit: (values: CatFormValues) => Promise<void>;
  isPending: boolean;
}) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CatFormValues>({
    resolver: zodResolver(catSchema),
    defaultValues,
  });

  const nameVal = watch("name");

  const autoSlug = () => {
    setValue("slug", nameVal.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-2">
      <div className="space-y-1.5">
        <Label htmlFor="cat-name">Name</Label>
        <Input id="cat-name" placeholder="e.g. Plumbing" {...register("name")} onBlur={autoSlug} />
        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cat-slug">Slug</Label>
        <Input id="cat-slug" placeholder="e.g. plumbing" {...register("slug")} />
        {errors.slug && <p className="text-xs text-danger">{errors.slug.message}</p>}
        <p className="text-xs text-muted-foreground">Used in URLs. Only lowercase letters, numbers, and hyphens.</p>
      </div>
      <DialogFooter>
        <Button type="submit" loading={isPending} disabled={isPending} className="w-full">
          {isPending ? "Saving…" : "Save Category"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function AdminCategoriesManager() {
  const { data: categories, isLoading } = useAdminCategories();
  const { mutateAsync: create, isPending: creating } = useCreateCategoryMutation();
  const { mutateAsync: update, isPending: updating } = useUpdateCategoryMutation();
  const { mutate: del } = useDeleteCategoryMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Category Management</h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full rounded-[var(--radius-xl)]" />)}
        </div>
      )}

      {!isLoading && categories?.length === 0 && (
        <EmptyState
          icon={Tag}
          title="No categories yet"
          description="Create service categories for technicians to use"
          action={{ label: "Add Category", onClick: () => setDialogOpen(true) }}
        />
      )}

      {!isLoading && categories && categories.length > 0 && (
        <ul className="space-y-2" role="list">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm">{cat.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{cat.slug} · {formatDate(cat.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button size="icon-sm" variant="ghost" onClick={() => setEditing(cat)} aria-label={`Edit ${cat.name}`}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon-sm" variant="ghost" className="text-danger hover:bg-danger/10" aria-label={`Delete ${cat.name}`}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete category?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Delete "{cat.name}"? This will affect services in this category.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-danger text-danger-foreground hover:bg-danger/90"
                              onClick={() => del(cat.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>
          <CategoryForm
            onSubmit={async (v) => { await create(v); setDialogOpen(false); }}
            isPending={creating}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Category</DialogTitle></DialogHeader>
          {editing && (
            <CategoryForm
              defaultValues={{ name: editing.name, slug: editing.slug }}
              onSubmit={async (v) => { await update({ id: editing.id, data: v }); setEditing(null); }}
              isPending={updating}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
