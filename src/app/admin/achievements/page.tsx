"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { achievementSchema, type AchievementInput } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { SectionLoader } from "@/components/shared/loading";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  order: number;
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AchievementInput>({
    resolver: zodResolver(achievementSchema) as any,
  });

  const fetchData = () => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then(setAchievements)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null);
    reset({ title: "", description: "", icon: "Trophy", date: "", order: 0 });
    setDialogOpen(true);
  };

  const openEdit = (item: Achievement) => {
    setEditing(item);
    reset({
      title: item.title,
      description: item.description,
      icon: item.icon,
      date: item.date ? new Date(item.date).toISOString().split("T")[0] : "",
      order: item.order,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: AchievementInput) => {
    setSaving(true);
    try {
      const url = editing ? `/api/achievements/${editing._id}` : "/api/achievements";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editing ? "Achievement updated" : "Achievement created");
      setDialogOpen(false);
      fetchData();
    } catch {
      toast.error("Failed to save achievement");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this achievement?")) return;
    try {
      await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      toast.success("Achievement deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <SectionLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground mt-1">Manage certifications and awards.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" /> Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
              <DialogDescription>
                {editing ? "Update achievement details" : "Add a new achievement"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input {...register("title")} />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea {...register("description")} rows={3} />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon (Lucide icon name)</Label>
                  <Input {...register("icon")} placeholder="Trophy, Award, Star..." />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" {...register("date")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input type="number" {...register("order")} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No achievements yet.
                  </TableCell>
                </TableRow>
              ) : (
                achievements.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[250px] truncate">{item.description}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.date ? formatDateShort(item.date) : "—"}</TableCell>
                    <TableCell>{item.order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(item)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteItem(item._id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
