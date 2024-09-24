import { supabase } from "@/config/supabase";

enum ResourceCategory {
  MOBILE_DEVELOPMENT = "Mobile Development",
  WEB_DEVELOPMENT = "Web Development",
  UI_UX = "UI/UX",
  DATA_SCIENCE = "Data Science",
  DEVOPS = "DevOps",
  SECURITY = "Security",
  COMPETITIVE_PROGRAMMING = "Competitive Programming",
  OTHER = "Other",
}

enum FileCategory {
  VIDEO = "Video",
  PDF = "PDF",
  IMAGE = "Image",
  AUDIO = "Audio",
  OTHER = "Other",
}

interface ResourceFile {
  id: string;
  url: string;
  category: FileCategory;
  created_at: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  url?: string;
  category: string;
  // category: ResourceCategory;
  // files: ResourceFile[];
  created_at: string;
}

export const getResources = async () => {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data as Resource[];
}

export const getResource = async (id: string) => {
  const {data, error} = await supabase.from("resources").select("*").eq("id", id).single();
  if (error) {
    throw error;
  }
  return data as Resource;
}

export const createResource = async (resource: Resource) => {
  const {data, error} = await supabase.from("resources").insert(resource).select().single();
  if (error) {
    throw error;
  }
    return data as Resource;
}

export const updateResource = async (id: string, resource: Resource) => {
  const {data, error} = await supabase.from("resources").update(resource).eq("id", id).select().single();
  if (error) {
    throw error;
  }
  return data as Resource;
}

export const deleteResource = async (id: string) => {
  const {data, error} = await supabase.from("resources").delete().eq("id", id).select().single();
  if (error) {
    throw error;
  }
  return data as Resource;
}