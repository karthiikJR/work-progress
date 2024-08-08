"use server";

import { loginSchema, registerSchema } from "@/lib/schema";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export const onSubmitLogin = async (formData: z.infer<typeof loginSchema>) => {
	// TODO - Implement login logic
	const supabase = createClient();

	console.log(formData);
	const data = {
		email: formData.email,
		password: formData.password,
	};

	const { data: userData, error } = await supabase.auth.signInWithPassword(
		data
	);

	if (error) {
		console.error(error);
		return;
	}

	console.log(userData);
};

export const onSubmitRegister = async (
	data: z.infer<typeof registerSchema>
) => {
	// TODO - Implement register logic
	console.log(data);
};

export const onSubmitLogout = async () => {
	// TODO - Implement logout logic
};

export const onSubmitForgotPassword = async (email: string) => {};

export const onGoogleLogin = async () => {
	// TODO - Implement Google login logic
	const supabase = createClient();
	const { data: googleLogin, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: "http://localhost:3000/projects",
		},
	});

	if (error) {
		console.error(error);
		return { link: null };
	}
	console.log(googleLogin);
	return { link: googleLogin.url };
};
