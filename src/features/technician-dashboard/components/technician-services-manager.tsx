"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Wrench } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/domain/formatters";
import type { Service } from "@/domain/models";

const serviceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string(),
  categoryId: z.string().min(1, "Select a category"),
});
type ServiceFormValues = z.infer<typeof serviceSchema>;

function ServiceForm({
  defaultValues,
  onSubmit,
  isPending,
}: {
  defaultValues?: Partial<ServiceFormValues & { price: string }>;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
  isPending: boolean;
}) {
  const { data: categories } = useCategories();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultValues ?? {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 mt-2">
      <div className="space-y-1.5">
        <Label htmlFor="s-name">Service name</Label>
        <Input id="s-name" placeholder="e.g. Kitchen Plumbing Fix" {...register("name")} />
        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="s-desc">Description</Label>
        <Input id="s-desc" placeholder="Describe the service…" {...register("description")} />
        {errors.description && <p className="text-xs text-danger">{errors.description.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="s-price">Price (BDT)</Label>
          <Input id="s-price" type="number" min="0" placeholder="0" {...register("price")} />
          {errors.price && <p className="text-xs text-danger">{errors.price.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select onValueChange={(v) => setValue("categoryId", v)} defaultValue={defaultValues?.categoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && <p className="text-xs text-danger">{errors.categoryId.message}</p>}
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" loading={isPending} disabled={isPending} className="w-full">
          {isPending ? "Saving…" : "Save Service"}
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Services</h1>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2].map((i) => <Skeleton key={i} className="h-24 w-full rounded-[var(--radius-xl)]" />)}
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
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-foreground text-sm">{service.name}</h3>
                        <Badge variant="secondary" className="text-xs">{service.category?.name ?? "No category"}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{service.description}</p>
                      <p className="text-sm font-bold text-brand mt-1">{formatCurrency(service.price)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button size="icon-sm" variant="ghost" onClick={() => setEditing(service)} aria-label="Edit service">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon-sm" variant="ghost" className="text-danger hover:bg-danger/10" aria-label="Delete service">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete service?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Remove "{service.name}"? Active bookings may be affected.
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

      {/* Create dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <ServiceForm onSubmit={handleCreate} isPending={creating} />
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {editing && (
            <ServiceForm
              defaultValues={{
                name: editing.name,
                description: editing.description,
                price: String(editing.price),
                categoryId: editing.categoryId,
              }}
              onSubmit={handleUpdate}
              isPending={updating}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
