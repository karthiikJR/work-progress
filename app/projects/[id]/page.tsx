"use client";

import Heading from "@/components/custom/Heading";
import { Kanban } from "@/components/custom/Kanban";
import { usePathname } from "next/navigation";

const ProjectPage = () => {
	const router = usePathname();

	const links = [
		{
			id: 1,
			title: "Dashboard",
			description:
				"View your dashboard that contains all the information you need to know about your project",
		},
		{
			id: 2,
			title: "Shopping",
			description:
				"View your shopping list and add items to your cart to purchase",
		},
		{
			id: 3,
			title: "Products",
			description:
				"View all the products available for purchase and add them to your cart",
		},
		{
			id: 4,
			title: "Customers",
			description:
				"View all the customers that have purchased items from your store",
		},
		{
			id: 5,
			title: "Analytics",
			description:
				"View the analytics of your store to see how well your store is performing",
		},
	];

	const path = router.split("/")[router.split("/").length - 1];
	const linkDetails = links.find((link) => link.id.toString() === path);

	return (
		<div className="overflow-hidden mx-auto max-w-7xl py-12">
			<Heading heading={linkDetails?.title || "Projects"} description={linkDetails?.description} />
			<Kanban />
		</div>
	);
};

export default ProjectPage;
