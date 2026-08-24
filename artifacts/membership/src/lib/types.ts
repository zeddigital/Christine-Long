export type Series = "transformation" | "savvy_start_up" | "itbiy" | "bonus";

export interface Module {
  id: number;
  name: string;
  slug: string;
  series: Series;
  summary: string | null;
  sort_order: number;
}

export interface Lesson {
  id: number;
  module_id: number;
  title: string;
  slug: string;
  status: "published" | "draft";
  sort_order: number;
}

export interface LessonSection {
  id: number;
  lesson_id: number;
  section_key: string;
  title: string;
  body_html: string;
  is_empty: boolean;
  sort_order: number;
}

export interface MediaItem {
  id: number;
  kind: "pdf" | "audio" | "image" | "video" | "other";
  provider: "storage" | "youtube";
  storage_path: string | null;
  external_id: string | null;
  title: string | null;
  available: boolean;
}

export interface LessonMedia {
  role: "worksheet" | "track" | "video" | "image";
  sort_order: number;
  media: MediaItem;
}

export interface Progress {
  lesson_id: number;
  completed_at: string | null;
}

export const SERIES_LABEL: Record<Series, string> = {
  transformation: "Transformation Series",
  savvy_start_up: "Savvy Start Up",
  itbiy: "In the Blink of an Eye",
  bonus: "Bonuses",
};
