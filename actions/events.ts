import { supabase } from "@/config/supabase";

export interface Event {
  id: string;
  name: string;
  description: string;
  venue?: string;
  image?: string
  startDate: string;
  endDate?: string;
  created_at: string;
}

// export const getUpcomingEvents = async () => {
//   const response = await fetch("https://gdsc-vnrvjiet-backend-updated-tau.vercel.app/Events/get-upcoming-events");
//   const data = await response.json();
//   return data.payload;
// };

// export const getPastEvents = async () => {
//   const response = await fetch("https://gdsc-vnrvjiet-backend-updated-tau.vercel.app/Events/get-past-events");
//   const data = await response.json();
//   return data.payload.reverse();
// };

export const getUpcomingEvents = async () => {
  const today = new Date().toISOString();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .or(`startDate.is.null,startDate.gt.${today}`)
    .order("startDate", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }

  return data as Event[];
};

export const getPastEvents = async () => {
  const today = new Date().toISOString();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .or(`endDate.lt.${today}`)
    .order("startDate", { ascending: false });

  if (error) {
    console.error("Error fetching past events:", error);
    return [];
  }

  return data as Event[];
};

export const getEventById = async (id: string) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching event by id:", error);
    return null;
  }

  return data as Event;
};