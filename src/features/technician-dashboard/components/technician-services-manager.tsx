"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Wrench } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCurrentUser } from "@/features/auth/queries";
import { useServices, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation } from "@/features/services/queries";
import { useCategories } from "@/features/categories/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/feedback/empty-state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/domain/formatters";
import { cn } from "@/lib/utils";
import type { Service } from "@/domain/models";

const serviceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) >= 0, "Enter a valid price"),
  categoryId: z.string().min(1, "Select a category"),
});
type ServiceFormValues = z.infer<typeof serviceSchema>;

function ServiceForm({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = "Save Service",
}: {
  defaultValues?: Partial<ServiceFormValues>;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
  isPending: boolean;
  submitLabel?: string;
}) {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      categoryId: "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="s-name">Service name</Label>
        <Input
          id="s-name"
          placeholder="e.g. Kitchen Plumbing Fix"
          autoComplete="off"
          {...register("name")}
        />
        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="s-desc">Description</Label>
        <textarea
          id="s-desc"
          rows={3}
          placeholder="Describe what this service includes…"
          className={cn(
            "flex min-h-[5.5rem] w-full resize-y rounded-[var(--radius-md)] border border-input bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-danger">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="s-price">Price (BDT)</Label>
        <Input
          id="s-price"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          placeholder="0"
          {...register("price")}
        />
        {errors.price && <p className="text-xs text-danger">{errors.price.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="s-category">Category</Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value || undefined}
              onValueChange={field.onChange}
              disabled={categoriesLoading || !categories?.length}
            >
              <SelectTrigger
                id="s-category"
                aria-invalid={!!errors.categoryId}
                className={cn(errors.categoryId && "border-danger focus-visible:ring-danger/30")}
              >
                <SelectValue
                  placeholder={
                    categoriesLoading
                      ? "Loading categories…"
                      : categories?.length
                        ? "Select a category"
                        : "No categories available"
                  }
                />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={6}>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-xs text-danger">{errors.categoryId.message}</p>
        )}
        {!categoriesLoading && categories?.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Ask an admin to create categories before adding services.
          </p>
        )}
      </div>

      <DialogFooter className="gap-2 sm:gap-2 pt-1">
        <Button type="submit" loading={isPending} disabled={isPending} className="w-full sm:w-auto sm:min-w-[9rem]">
          {isPending ? "Saving…" : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function TechnicianServicesManager() {
  const { data: user } = useCurrentUser();
  const { data: services, isLoading } = useServices(user ? { technicianId: user.id } : {});
  const { mutateAsync: create, isPending: creating } = useCreateServiceMutation();
  const { mutateAsync: update, isPending: updating } = useUpdateServiceMutation();
  const { mutate: del } = useDeleteServiceMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  const handleCreate = async (values: ServiceFormValues) => {
    await create({ ...values, price: Number(values.price) });
    setDialogOpen(false);
  };

  const handleUpdate = async (values: ServiceFormValues) => {
    if (!editing) return;
    await update({ id: editing.id, data: { ...values, price: Number(values.price) } });
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">My Services</h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-[var(--radius-xl)]" />
          ))}
        </div>
      )}

      {!isLoading && services?.length === 0 && (
        <EmptyState
          icon={Wrench}
          title="No services yet"
          description="Add your first service to start receiving bookings"
          action={{ label: "Add Service", onClick: () => setDialogOpen(true) }}
        />
      )}

      {!isLoading && services && services.length > 0 && (
        <ul className="space-y-3" role="list">
          {services.map((service) => (
            <li key={service.id}>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {service.category?.name ?? "No category"}
                        </Badge>
                      </div>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {service.description}
                      </p>
                      <p className="mt-1 text-sm font-bold text-brand">
                        {formatCurrency(service.price)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => setEditing(service)}
                        aria-label="Edit service"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            className="text-danger hover:bg-danger/10"
                            aria-label="Delete service"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete service?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Remove &quot;{service.name}&quot;? Active bookings may be affected.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-danger text-danger-foreground hover:bg-danger/90"
                              onClick={() => del(service.id)}
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
        <DialogContent className="gap-5 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a service customers can book from your profile.
            </DialogDescription>
          </DialogHeader>
          <ServiceForm
            onSubmit={handleCreate}
            isPending={creating}
            submitLabel="Save Service"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="gap-5 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update the details of this service offering.</DialogDescription>
          </DialogHeader>
          {editing && (
            <ServiceForm
              key={editing.id}
              defaultValues={{
                name: editing.name,
                description: editing.description,
                price: String(editing.price),
                categoryId: editing.categoryId,
              }}
              onSubmit={handleUpdate}
              isPending={updating}
              submitLabel="Update Service"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
