import { supabase } from "@/config/supabase";

export interface User {
	id: string;
	username?: string;
	name?: string;
	email: string;
	phoneNumber?: string;
  image?: string;
  created_at: string;
  role: "ADMIN" | "USER";
}

export const getCurrentUser = async () => {
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		throw error;
	}

	const userDetails = await getUserDetailsById(data.user.id);
	
	if (userDetails.success) {
		return userDetails.data;
	}

	return null;
};

export const getUserDetailsById = async (userId: string) => {
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true, data: data as User };
};
