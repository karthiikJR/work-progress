"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/custom/DarkMode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "@/components/context/AuthContext";

import { PlusIcon } from "lucide-react";
import Image from "next/image";

function Sidebar() {
	const { userId } = useAuth();
	console.log(userId);

	const [links, setLinks] = useState([
		{
			id: 1,
			title: "Dashboard",
		},
		{
			id: 2,
			title: "Shopping",
		},
		{
			id: 3,
			title: "Products",
		},
		{
			id: 4,
			title: "Customers",
		},
		{
			id: 5,
			title: "Analytics",
		},
	]);

	const path = usePathname().split("/")[usePathname().split("/").length - 1];

	const [addProjectData, setAddProjectData] = useState({
		name: "Work progress",
		description:
			"A web application designed to help you organize and manage your projects with ease.",
	});

	const addData = () => {
		setLinks((pv) => [
			...pv,
			{ id: links.length + 1, title: addProjectData.name },
		]);
	};

	return (
		<aside className="fixed left-0 z-20 flex h-full flex-col border-r">
			<div className="border-r bg-muted/40 md:block">
				<div className="flex h-screen max-h-screen flex-col gap-2">
					{/* Logo and website name */}
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
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
										className="flex items-center justify-start gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
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
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="description" className="text-right">
												Description
											</Label>
											<Textarea
												id="description"
												onChange={(event) =>
													setAddProjectData({
														...addProjectData,
														description: event.target.value,
													})
												}
												value={addProjectData.description}
												className="col-span-3"
											/>
										</div>
									</div>
									<DialogFooter>
										<Button onClick={addData} type="submit">
											Save
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>

							{links.map((link) => (
								<Link
									key={link.id}
									href={`/projects/${link.id}`}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
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
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
