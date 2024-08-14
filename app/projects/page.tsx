import Dashboard from "@/components/custom/Dashboard";
import Heading from "@/components/custom/Heading";

function page() {


	return (
		<section className="mx-auto h-screen max-w-7xl px-4 py-12">
			<Heading projectId="" heading="Projects" />
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Project details at a Glance
			</h1>
			<p className="leading-7 [&:not(:first-child)]:mt-6">
				This dashboard provides a quick overview of the projects and tasks that are currently in progress.
			</p>
			<Dashboard />
		</section>
	);
}

export default page;
