"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/custom/Heading";

function page() {
	return (
		<section className="mx-auto h-screen max-w-7xl px-4 py-12">
			<Heading projectId="" heading="Projects" />
			<div className="mb-4 grid grid-cols-12 gap-4 text-background">
				<BounceCard className="col-span-12 md:col-span-4">
					<CardTitle>View Project</CardTitle>
					<div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
						<span className="block text-center font-semibold text-indigo-50">
							FEATURE DEMO HERE
						</span>
					</div>
				</BounceCard>
				<BounceCard className="col-span-12 md:col-span-8">
					<CardTitle>Do another thing</CardTitle>
					<div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-400 to-orange-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
						<span className="block text-center font-semibold text-orange-50">
							FEATURE DEMO HERE
						</span>
					</div>
				</BounceCard>
			</div>
			<div className="grid grid-cols-12 gap-4 text-background">
				<BounceCard className="col-span-12 md:col-span-8">
					<CardTitle>And this too</CardTitle>
					<div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
						<span className="block text-center font-semibold text-emerald-50">
							FEATURE DEMO HERE
						</span>
					</div>
				</BounceCard>
				<BounceCard className="col-span-12 md:col-span-4">
					<CardTitle>And finally this</CardTitle>
					<div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-400 to-red-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
						<span className="block text-center font-semibold text-red-50">
							FEATURE DEMO HERE
						</span>
					</div>
				</BounceCard>
			</div>
		</section>
	);
}

const BounceCard = ({
	className,
	children,
}: {
	className: string;
	children: ReactNode;
}) => {
	return (
		<motion.div
			whileHover={{ scale: 0.95, rotate: "-1deg" }}
			className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
		>
			{children}
		</motion.div>
	);
};

const CardTitle = ({ children }: { children: ReactNode }) => {
	return (
		<h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
	);
};

export default page;
