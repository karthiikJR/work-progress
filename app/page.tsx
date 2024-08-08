import Sidebar from "@/components/custom/Sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="h-screen flex justify-center items-center">
			<section>
				<div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
					<div className="space-y-5 max-w-4xl mx-auto text-center">
						<h1 className="text-sm text-indigo-600 font-medium">
							Keep track of your projects
						</h1>
						<h2 className="text-4xl text-foreground font-extrabold mx-auto md:text-5xl">
							Develop your projects faster with{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
								Work Progress
							</span>
						</h2>
						<p className="max-w-2xl mx-auto">
							A web application designed to help you organize and manage your
							projects with ease. Ideal for individuals and teams.
						</p>
						<div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
							<Button variant={"default"} asChild>
								<Link href="/projects"> Know more -{">"}</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
