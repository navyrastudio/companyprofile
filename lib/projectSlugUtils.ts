/**
 * Get project slug from ID
 */
import projectData from "@/data/project.json";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const projectIdToSlug: Record<number, string> = {};
const slugToProjectId: Record<string, number> = {};

projectData.forEach((p: { id: number; slug?: string; title?: string }) => {
  const slug = (p.slug as string) || slugify(p.title || `project-${p.id}`);
  projectIdToSlug[p.id] = slug;
  slugToProjectId[slug] = p.id;
});

export function getProjectSlug(projectId: number): string {
  return projectIdToSlug[projectId] || "";
}

export function getProjectIdFromSlug(slug: string): number | null {
  const id = slugToProjectId[slug.toLowerCase()];
  return typeof id === "number" ? id : null;
}
