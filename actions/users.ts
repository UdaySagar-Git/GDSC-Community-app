import { supabase } from "@/config/supabase";

export const getUserDetailsById = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
		.single();

	if (error) {
		return { success: false, error: error.message };
  }

  return { success: true, data: data };
};
