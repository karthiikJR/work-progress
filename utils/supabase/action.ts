"use server";

import { loginSchema, registerSchema } from "@/lib/schema";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

import { redirect } from "next/navigation";

export const onSubmitLogin = async (formData: z.infer<typeof loginSchema>) => {
	const supabase = createClient();

	const data = {
		email: formData.email,
		password: formData.password,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	redirect("/projects");
};

export const onSubmitRegister = async (
	data: z.infer<typeof registerSchema>
) => {
	const supabase = createClient();

	const { data: regData, error } = await supabase.auth.admin.createUser({
		email: data.email,
		password: data.password,
		email_confirm: true,
		user_metadata: {
			name: data.name,
		},
	});

	return { regData, error };
};

export const onSubmitLogout = async () => {
	const supabase = createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error("Error signing out", error);
		throw new Error("Error signing out");
	} else {
		redirect("/");
	}
};

export const onSubmitForgotPassword = async (email: string) => {
	const supabase = createClient();

	const { error } = await supabase.auth.resetPasswordForEmail(email);

	return { error };
};

export const onGoogleLogin = async () => {
	const supabase = createClient();
	const { data: googleLogin, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/projects`,
		},
	});

	if (error) {
		console.error(error);
		return { link: null };
	}
	return { link: googleLogin.url };
};

export const getUserProfile = async () => {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();

	return { data, error };
};
