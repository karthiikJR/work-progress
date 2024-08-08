"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginSchema, registerSchema } from "@/lib/schema";
import {
	onSubmitLogin,
	onSubmitRegister,
	onGoogleLogin,
	onSubmitForgotPassword,
} from "@/utils/supabase/action";

const Google = () => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="20px"
			viewBox="0 0 48 48"
			enableBackground="new 0 0 48 48"
			xmlSpace="preserve"
		>
			<path
				fill="#FFC107"
				d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
			/>
			<path
				fill="#FF3D00"
				d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
			/>
			<path
				fill="#4CAF50"
				d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
			/>
			<path
				fill="#1976D2"
				d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
			/>
		</svg>
	);
};

export function AuthForm() {
	const [isPasswordVisible, setIsPasswordVisible] = useState({
		login: false,
		register: false,
	});

	const loginForm = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const registerForm = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			username: "",
		},
	});

	const loginSubmit = async (formData: z.infer<typeof loginSchema>) => {
		await onSubmitLogin(formData);
	};

	const registerSubmit = async (formData: z.infer<typeof registerSchema>) => {
		await onSubmitRegister(formData);
	};

	const loginGoogleSubmit = async () => {
		const { link } = await onGoogleLogin();
		console.log(link);
		if (link) {
			window.location.href = link;
		}
	};

	function RegisterDialog() {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button
						className="ml-auto inline-block text-sm underline px-1"
						variant="link"
					>
						Sign Up
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Sign Up</DialogTitle>
						<DialogDescription>
							Create a new account to store your project's kanban boards and
							keep track of your work.
						</DialogDescription>
					</DialogHeader>
					<Form {...registerForm}>
						<form
							onSubmit={registerForm.handleSubmit(registerSubmit)}
							className="grid gap-4"
						>
							<FormField
								control={registerForm.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="johndoe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={registerForm.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={registerForm.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit" className="w-full">
									Sign Up
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="p-4 mx-auto grid gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<Form {...loginForm}>
						<form
							onSubmit={loginForm.handleSubmit(loginSubmit)}
							className="grid gap-4"
						>
							<FormField
								control={loginForm.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={loginForm.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center">
											Password
											<Link
												href="#"
												className="ml-auto inline-block text-sm underline"
											>
												Forgot your password?
											</Link>
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={`${
														isPasswordVisible.login ? "text" : "password"
													}`}
													{...field}
												/>
												<Button
													type="button"
													onClick={() =>
														setIsPasswordVisible((prev) => ({
															...prev,
															login: !prev.login,
														}))
													}
													variant="ghost"
													className="absolute top-0 right-0"
												>
													{isPasswordVisible.login ? (
														<EyeOffIcon />
													) : (
														<EyeIcon />
													)}
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Login
							</Button>
							<Button
								onClick={() => loginGoogleSubmit()}
								type="button"
								variant="outline"
								className="w-full flex items-center gap-2"
							>
								<Google />
								Login with Google
							</Button>
						</form>
					</Form>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account? <RegisterDialog />
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">
				<Image
					src="/work-progress-logo.svg"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.8]"
				/>
			</div>
		</div>
	);
}
