import { supabase } from "@/config/supabase";
import { getCurrentUser, User } from "./users";

export interface Message {
  id: string;
  message: string;
  user_id: string;
  forum_id: string;
  created_at: string;
  user?: User
}

export interface Forum {
  id: string;
  title: string;
  created_by_id: string;
  created_at: string;
  created_by?: User
}

export const getForums = async () => {
  const { data, error } = await supabase
    .from("forums")
    .select("*, created_by:users(id, name, image)")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data as Forum[];
};

export const getForumById = async (id: string) => {
  const { data, error } = await supabase
    .from("forums")
    .select("*, created_by:users(id, name, image)")
    .eq("id", id)
    .single();
    
  if (error) {
    throw error;
  }
  return data as Forum;
};

export const createForum = async (title: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("forums")
    .insert({
      title,
      created_by_id: currentUser.id,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as Forum;
};

export const createMessage = async ({ message, forumId }: { message: string, forumId: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      message,
      forum_id: forumId,
      user_id: currentUser.id,
    })
    .select("*, user:users(id, name, image)")
    .single();

  if (error) {
    throw error;
  }

  return data as Message;
};

export const getMessagesByForumId = async (forumId: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*, user:users(id, name, image)")
    .eq("forum_id", forumId)
    .order("created_at", { ascending: true });
  if (error) {
    throw error;
  }
  return data as Message[];
};

