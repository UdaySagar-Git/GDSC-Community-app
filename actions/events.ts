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

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('startDate', { ascending: true });

  if (error) {
    console.error('Error fetching upcoming events:', error);

    return [];
  }

  return data;
};

export const getPastEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('startDate', { ascending: false });

  if (error) {
    console.error('Error fetching past events:', error);
    return [];
  }

  return data;
};
