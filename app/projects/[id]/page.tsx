"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { getProject } from "@/app/api/Project";

import Heading from "@/components/custom/Heading";
import { Kanban } from "@/components/custom/Kanban";

const ProjectPage = () => {
	const router = usePathname();

	const [linkDetails, setLinkDetails] = useState<{
		id: string;
		projectName: string;
		projectDetails: string;
	}>({
		id: "",
		projectName: "Project Name",
		projectDetails: "Description about the project thats being worked on",
	});

	const projectId = router.split("/")[router.split("/").length - 1];

	useEffect(() => {
		try {
			getProject(projectId).then((data) => {
				if (data.error) throw data.error;
				if (data && data.data) {
					setLinkDetails({
						id: data.data.projectId,
						projectName: data.data.projectName,
						projectDetails: data.data.projectDetails,
					});
				}
			});
		} catch (error) {
			postMessage(
				"error",
				(error as Error).message || "Error fetching project"
			);
		}
	}, [projectId]);

	return (
		<div className="overflow-hidden mx-auto max-w-7xl py-12">
			<Heading
				projectId={projectId}
				heading={linkDetails.projectName}
				description={linkDetails.projectDetails}
			/>
			<Kanban projectId={projectId} />
		</div>
	);
};

export default ProjectPage;
