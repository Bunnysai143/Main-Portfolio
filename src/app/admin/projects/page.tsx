"use client";

import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectInput } from "@/schemas";
import Image from "next/image";
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
import { Plus, Pencil, Trash2, ExternalLink, Github } from "lucide-react";

const categories = ["Full Stack", "Backend", "Frontend", "AI/ML", "DevOps", "Other"];

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  category: string;
  featured: boolean;
  order: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [technologiesText, setTechnologiesText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema) as Resolver<ProjectInput>,
  });

  const fetchData = () => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("folder", "projects");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      return data.url || null;
    } catch {
      return null;
    }
  };

  const openCreate = () => {
    setEditing(null);
    setFeatured(false);
    setTechnologiesText("");
    setImageFile(null);
    setImagePreview("");
    reset({
      title: "", slug: "", description: "", longDescription: "",
      technologies: [], githubUrl: "", liveUrl: "", image: "",
      category: "Full Stack", featured: false, order: 0,
    });
    setDialogOpen(true);
  };

  const openEdit = (proj: Project) => {
    setEditing(proj);
    setFeatured(proj.featured);
    setTechnologiesText(proj.technologies.join(", "));
    setImageFile(null);
    setImagePreview(proj.image || "");
    reset({
      title: proj.title,
      slug: proj.slug,
      description: proj.description,
      longDescription: proj.longDescription,
      technologies: proj.technologies,
      githubUrl: proj.githubUrl || "",
      liveUrl: proj.liveUrl || "",
      image: proj.image || "",
      category: proj.category as ProjectInput["category"],
      featured: proj.featured,
      order: proj.order,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: ProjectInput) => {
    setSaving(true);
    try {
      let imageUrl = data.image || "";
      if (imageFile) {
        const uploaded = await uploadImage();
        if (uploaded) imageUrl = uploaded;
      }

      const payload = {
        ...data,
        featured,
        technologies: technologiesText.split(",").map((t) => t.trim()).filter(Boolean),
        image: imageUrl,
      };

      const url = editing ? `/api/projects/${editing._id}` : "/api/projects";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editing ? "Project updated" : "Project created");
      setDialogOpen(false);
      fetchData();
    } catch {
      toast.error("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      toast.success("Project deleted");
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
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Project" : "Add Project"}</DialogTitle>
              <DialogDescription>
                {editing ? "Update project details" : "Add a new project"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input {...register("title")} />
                  {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input {...register("slug")} placeholder="my-project" />
                  {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea {...register("description")} rows={2} />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Long Description</Label>
                <Textarea {...register("longDescription")} rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue={editing?.category || "Full Stack"} onValueChange={(v) => setValue("category", v as ProjectInput["category"])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input type="number" {...register("order")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={technologiesText}
                  onChange={(e) => setTechnologiesText(e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input {...register("githubUrl")} placeholder="https://github.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input {...register("liveUrl")} placeholder="https://..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Project Image</Label>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <div className="relative mt-2 h-32 w-48">
                    <Image src={imagePreview} alt="Preview" fill className="rounded-md object-cover" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={featured} onCheckedChange={setFeatured} />
                <Label>Featured Project</Label>
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
                <TableHead>Category</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Links</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No projects yet.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((proj) => (
                  <TableRow key={proj._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {proj.title}
                        {proj.featured && <Badge className="text-[10px]">Featured</Badge>}
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{proj.category}</Badge></TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {proj.technologies.slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                        ))}
                        {proj.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-[10px]">+{proj.technologies.length - 3}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(proj)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteItem(proj._id)}>
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
