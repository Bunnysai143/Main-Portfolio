"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema, type EducationInput } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  grade: string;
  description: string;
  achievements: string[];
  order: number;
}

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Education | null>(null);
  const [saving, setSaving] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [achievementsText, setAchievementsText] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationInput>({
    resolver: zodResolver(educationSchema) as any,
  });

  const fetchData = () => {
    fetch("/api/education")
      .then((res) => res.json())
      .then(setEducations)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null);
    setIsCurrent(false);
    setAchievementsText("");
    reset({
      institution: "", degree: "", field: "", startDate: "", endDate: "",
      isCurrent: false, grade: "", description: "", achievements: [], order: 0,
    });
    setDialogOpen(true);
  };

  const openEdit = (ed: Education) => {
    setEditing(ed);
    setIsCurrent(ed.isCurrent);
    setAchievementsText(ed.achievements.join("\n"));
    reset({
      institution: ed.institution,
      degree: ed.degree,
      field: ed.field,
      startDate: ed.startDate ? new Date(ed.startDate).toISOString().split("T")[0] : "",
      endDate: ed.endDate ? new Date(ed.endDate).toISOString().split("T")[0] : "",
      isCurrent: ed.isCurrent,
      grade: ed.grade || "",
      description: ed.description || "",
      achievements: ed.achievements,
      order: ed.order,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: EducationInput) => {
    setSaving(true);
    const payload = {
      ...data,
      isCurrent,
      achievements: achievementsText.split("\n").filter((a) => a.trim()),
    };

    try {
      const url = editing ? `/api/education/${editing._id}` : "/api/education";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editing ? "Education updated" : "Education created");
      setDialogOpen(false);
      fetchData();
    } catch {
      toast.error("Failed to save education");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this education entry?")) return;
    try {
      await fetch(`/api/education/${id}`, { method: "DELETE" });
      toast.success("Education deleted");
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
          <h1 className="text-2xl font-bold tracking-tight">Education</h1>
          <p className="text-muted-foreground mt-1">Manage education history.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Education" : "Add Education"}</DialogTitle>
              <DialogDescription>
                {editing ? "Update education details" : "Add a new education entry"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input {...register("institution")} />
                {errors.institution && <p className="text-xs text-destructive">{errors.institution.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input {...register("degree")} placeholder="B.Tech, M.Sc, etc." />
                  {errors.degree && <p className="text-xs text-destructive">{errors.degree.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input {...register("field")} placeholder="Computer Science" />
                  {errors.field && <p className="text-xs text-destructive">{errors.field.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" {...register("startDate")} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" {...register("endDate")} disabled={isCurrent} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={isCurrent} onCheckedChange={setIsCurrent} />
                <Label>Currently studying</Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Grade / GPA</Label>
                  <Input {...register("grade")} placeholder="9.0 CGPA" />
                </div>
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input type="number" {...register("order")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea {...register("description")} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Achievements (one per line)</Label>
                <Textarea
                  value={achievementsText}
                  onChange={(e) => setAchievementsText(e.target.value)}
                  rows={4}
                  placeholder="Dean&#39;s List 2023&#10;Best Project Award..."
                />
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
                <TableHead>Institution</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {educations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No education entries yet.
                  </TableCell>
                </TableRow>
              ) : (
                educations.map((ed) => (
                  <TableRow key={ed._id}>
                    <TableCell className="font-medium">{ed.institution}</TableCell>
                    <TableCell>{ed.degree}</TableCell>
                    <TableCell>{ed.field}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDateShort(ed.startDate)} – {ed.isCurrent ? "Present" : ed.endDate ? formatDateShort(ed.endDate) : "N/A"}
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{ed.grade || "—"}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(ed)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteItem(ed._id)}>
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
