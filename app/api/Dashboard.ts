import { createClient } from "@/utils/supabase/client";

export const getUserStats = async (userId: string) => {
	const supabase = createClient();
	const { data, error } = await supabase.rpc("get_user_project_stats", {
		user_id: userId,
	});

	return { data, error };
};
