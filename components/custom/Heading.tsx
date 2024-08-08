import { deleteProject } from "@/app/api/Project";
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
import { popMessage } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";

function Heading({
	heading,
	description,
	projectId,
}: {
	heading: string;
	description?: string;
	projectId: string;
}) {
	const deleteProjectDataFunction = async () => {
		if (projectId === "") return;
		try {
			const { error } = await deleteProject(projectId);
			if (error) {
				throw error;
			}
			popMessage("success", "Project deleted successfully");
			window.location.href = "/projects";
		} catch (error) {
			popMessage("error", (error as Error).message || "Error deleting project");
		}
	};

	return (
		<div className="mb-8 flex flex-col items-start gap-2 md:items-end">
			<div className="border-b w-full flex items-center justify-between pb-2">
				<h2 className="mt-10 w-full text-3xl font-semibold tracking-tight transition-colors first:mt-0">
					{heading}
				</h2>
				{projectId !== "" && (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="destructive" className="p-1 h-fit">
								<Trash2Icon size={20} />
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Are you absolutely sure?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. Are you sure you want to
									permanently delete this file from our servers?
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button
										onClick={() => {
											deleteProjectDataFunction();
										}}
									>
										Confirm
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}
			</div>
			<p className="w-full text-sm text-muted-foreground">Hello</p>
			{description && (
				<p className="w-full text-sm text-muted-foreground">{description}</p>
			)}
		</div>
	);
}

export default Heading;
