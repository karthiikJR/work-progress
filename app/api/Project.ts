import { createClient } from "@/utils/supabase/client";

export const getProjects = async (userId: string) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("project")
		.select("projectId, projectName")
		.eq("userId", userId);

	return { data, error };
};

export const addProject = async (
	userId: string,
	projectData: { projectName: string; projectDetails: string }
) => {
	const supabase = createClient();
	const { data, error } = await supabase.from("project").insert([
		{
			userId,
			projectName: projectData.projectName,
			projectDetails: projectData.projectDetails,
		},
	]);

	return { data, error };
};

export const getProject = async (projectId: string) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("project")
		.select("projectId, projectName, projectDetails")
		.eq("projectId", projectId)
		.single();

	return { data, error };
}

export const deleteProject = async (projectId: string) => {
	const supabase = createClient();
	const { error } = await supabase.from("project").delete().eq("projectId", projectId);

	return { error };
}