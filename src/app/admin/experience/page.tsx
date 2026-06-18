"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, type ExperienceInput } from "@/schemas";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const types = ["Full-time", "Part-time", "Internship", "Freelance", "Remote", "Contract"];

interface Experience {
  _id: string;
  company: string;
  position: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [saving, setSaving] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [responsibilitiesText, setResponsibilitiesText] = useState("");
  const [technologiesText, setTechnologiesText] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema) as any,
  });

  const fetchData = () => {
    fetch("/api/experiences")
      .then((res) => res.json())
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null);
    setIsCurrent(false);
    setResponsibilitiesText("");
    setTechnologiesText("");
    reset({
      company: "", position: "", type: "Full-time", location: "",
      startDate: "", endDate: "", isCurrent: false, description: "",
      responsibilities: [], technologies: [], order: 0,
    });
    setDialogOpen(true);
  };

  const openEdit = (exp: Experience) => {
    setEditing(exp);
    setIsCurrent(exp.isCurrent);
    setResponsibilitiesText(exp.responsibilities.join("\n"));
    setTechnologiesText(exp.technologies.join(", "));
    reset({
      company: exp.company,
      position: exp.position,
      type: exp.type,
      location: exp.location,
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().split("T")[0] : "",
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "",
      isCurrent: exp.isCurrent,
      description: exp.description,
      responsibilities: exp.responsibilities,
      technologies: exp.technologies,
      order: exp.order,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: ExperienceInput) => {
    setSaving(true);
    const payload = {
      ...data,
      isCurrent,
      responsibilities: responsibilitiesText.split("\n").filter((r) => r.trim()),
      technologies: technologiesText.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = editing ? `/api/experiences/${editing._id}` : "/api/experiences";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editing ? "Experience updated" : "Experience created");
      setDialogOpen(false);
      fetchData();
    } catch {
      toast.error("Failed to save experience");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    try {
      await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      toast.success("Experience deleted");
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
          <h1 className="text-2xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground mt-1">Manage work experience entries.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Experience" : "Add Experience"}</DialogTitle>
              <DialogDescription>
                {editing ? "Update experience details" : "Add a new experience"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input {...register("company")} />
                  {errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input {...register("position")} />
                  {errors.position && <p className="text-xs text-destructive">{errors.position.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select defaultValue={editing?.type || "Full-time"} onValueChange={(v) => setValue("type", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input {...register("location")} placeholder="City, Country" />
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
                <Label>Currently working here</Label>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea {...register("description")} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Responsibilities (one per line)</Label>
                <Textarea
                  value={responsibilitiesText}
                  onChange={(e) => setResponsibilitiesText(e.target.value)}
                  rows={4}
                  placeholder="Developed REST APIs...&#10;Optimized database queries..."
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={technologiesText}
                  onChange={(e) => setTechnologiesText(e.target.value)}
                  placeholder="Node.js, MongoDB, Docker"
                />
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
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No experiences yet.
                  </TableCell>
                </TableRow>
              ) : (
                experiences.map((exp) => (
                  <TableRow key={exp._id}>
                    <TableCell className="font-medium">{exp.position}</TableCell>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{exp.type}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDateShort(exp.startDate)} – {exp.isCurrent ? "Present" : exp.endDate ? formatDateShort(exp.endDate) : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(exp)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteItem(exp._id)}>
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
