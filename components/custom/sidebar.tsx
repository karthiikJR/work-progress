"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { ModeToggle } from "@/components/custom/DarkMode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/context/AuthContext";

import { addProject, getProjects } from "@/app/api/Project";

import { getUserProfile } from "@/utils/supabase/action";

import { UserProfile } from "@/lib/interface";
import { cn, popMessage } from "@/lib/utils";

function Sidebar() {
	const { userId, logout } = useAuth();

	const [links, setLinks] = useState<{ id: string; title: string }[]>([]);
	const [userData, setUserData] = useState<UserProfile>({
		id: "",
		email: "",
		displayName: "",
	});
	const [addProjectData, setAddProjectData] = useState({
		name: "",
		description: "",
	});

	const fetchProjects = () => {
		try {
			getProjects(userId).then((data) => {
				if (data.error) throw data.error;
				if (data && data.data) {
					if (data.data.length === 0) {
						setLinks([]);
						return;
					}
					const projects = data.data.map((project) => {
						return {
							id: project.projectId,
							title: project.projectName,
						};
					});
					setLinks(projects);
				}
			});
		} catch (error) {
			popMessage(
				"error",
				(error as Error)?.message || "Error fetching projects"
			);
		}
	};

	const getUserData = async () => {
		try {
			const { data, error } = await getUserProfile();
			if (error) {
				throw error;
			}
			if (data && data.user)
				setUserData({
					id: data.user.id || "",
					email: data.user.email || "",
					displayName: data.user.user_metadata.name,
					avatarUrl: data.user.user_metadata.avatar_url,
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProjects();
		getUserData();
	}, [userId]);

	const path = usePathname().split("/")[usePathname().split("/").length - 1];

	const addProjectDataFunction = async () => {
		try {
			const { error } = await addProject(userId, {
				projectName: addProjectData.name,
				projectDetails: addProjectData.description,
			});
			if (error) {
				throw error;
			}
			popMessage("success", "Project added successfully");
			fetchProjects();
			setAddProjectData({ description: "", name: "" });
		} catch (error) {
			popMessage("error", (error as Error)?.message || "Error adding project");
		}
	};

	return (
		<aside className="fixed left-0 z-20 flex h-full flex-col border-r">
			<div className="border-r bg-muted/40 md:block">
				<div className="flex h-screen max-h-screen flex-col gap-2">
					{/* Logo and website name */}
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link
							href="/projects"
							className="flex items-center gap-2 font-semibold"
						>
							<Image
								src="/work-progress-logo.svg"
								alt="Logo"
								width={1000}
								height={1000}
								className="h-6 w-6 rounded-full"
							/>
							<span className="">Work Progress</span>
						</Link>
					</div>

					{/* Navigation links */}
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant="outline"
										className="flex items-center justify-start gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground mb-3"
									>
										<span>Add Project</span>
										<PlusIcon size={15} />
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Add New Project</DialogTitle>
										<DialogDescription>
											Add a name and description for the Project you want to
											track progress.
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="name" className="text-right">
												Name
											</Label>
											<Input
												id="name"
												onChange={(event) =>
													setAddProjectData({
														...addProjectData,
														name: event.target.value,
													})
												}
												value={addProjectData.name}
												className="col-span-3"
												placeholder="Work progress"
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="description" className="text-right">
												Description
											</Label>
											<Textarea
												id="description"
												onChange={(event) => {
													setAddProjectData({
														...addProjectData,
														description: event.target.value,
													});
												}}
												value={addProjectData.description}
												className="col-span-3"
												placeholder="A web application designed to help you organize and manage your projects with ease."
											/>
										</div>
									</div>
									<DialogFooter>
										<DialogClose asChild>
											<Button
												onClick={async () => await addProjectDataFunction()}
												type="submit"
											>
												Save
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
							{links.length === 0 && (
								<p className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
									No projects
								</p>
							)}
							{links.length > 0 &&
								links.map((link) => (
									<Link
										key={link.id}
										href={`/projects/${link.id}`}
										className={cn(
											"group flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
											path === link.id.toString()
												? "bg-muted text-primary"
												: "text-muted-foreground"
										)}
									>
										{link.title}
									</Link>
								))}
						</nav>
					</div>

					{/* Footer */}
					<div className="mt-auto p-4">
						<div className="flex items-center justify-between text-sm gap-2">
							<ModeToggle />
							<Button variant="link" size="icon">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Avatar className="h-8 w-8">
											<AvatarImage src={userData.avatarUrl} />
											<AvatarFallback>
												{userData.displayName
													.split(" ")
													.slice(0, 2)
													.map((word) => word[0])
													.join("")
													.toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</DropdownMenuTrigger>
									<DropdownMenuContent side="top" align="center">
										<DropdownMenuLabel>
											{userData.displayName}
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => logout()}>
											Logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
