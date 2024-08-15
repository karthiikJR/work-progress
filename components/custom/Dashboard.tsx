"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getUserStats } from "@/app/api/Dashboard";
import { UserStats } from "@/lib/interface";

export default function Dashboard() {
	const { userId } = useAuth();
	const [userStats, setUserStats] = useState<UserStats>({
		taskStats: [
			{ activity: "done", value: 0, label: "", fill: "var(--color-done)" },
			{ activity: "todo", value: 0, label: "", fill: "var(--color-todo)" },
			{
				activity: "progress",
				value: 0,
				label: "",
				fill: "var(--color-progress)",
			},
		],
		totalProjects: 0,
		completedProjects: 0,
		pendingProjects: 0,
		totalTasks: 0,
		totalBacklog: 0,
	});

	const getStatus = async (userId: string) => {
		const { data, error } = await getUserStats(userId);
		if (error) {
			throw error;
		}
		return data;
	};

	useEffect(() => {
		try {
			getStatus(userId).then((stats) => {
				const totalTasks = stats[0].totalTasks;
				const taskStats = [
					{
						activity: "done",
						value: stats[0].totalDone / totalTasks,
						label: `${stats[0].totalDone} / ${totalTasks}`,
						fill: "var(--color-done)",
					},
					{
						activity: "todo",
						value: stats[0].totalTodo / totalTasks,
						label: `${stats[0].totalTodo} / ${totalTasks}`,
						fill: "var(--color-todo)",
					},
					{
						activity: "progress",
						value: stats[0].totalProgress / totalTasks,
						label: `${stats[0].totalProgress} / ${totalTasks}`,
						fill: "var(--color-progress)",
					},
				];

				const userStats: UserStats = {
					taskStats,
					totalProjects: stats[0].totalProjects,
					completedProjects: stats[0].completedProjects,
					pendingProjects: stats[0].pendingProjects,
					totalTasks: stats[0].totalTasks,
					totalBacklog: stats[0].totalBacklog,
				};

				setUserStats(userStats);
			});
		} catch (error) {
			console.log(error);
		}
	}, [userId]);


	return (
		<div className="flex gap-10 p-10">
			<Card className="max-w-sm flex-grow bg-transparent">
				<CardContent className="flex gap-4 p-4 pb-2">
					<ChartContainer
						config={{
							progress: {
								label: "progress",
								color: "hsl(var(--chart-1))",
							},
							done: {
								label: "done",
								color: "hsl(var(--chart-2))",
							},
							todo: {
								label: "todo",
								color: "hsl(var(--chart-3))",
							},
						}}
						className="h-[140px] w-full"
					>
						<BarChart
							margin={{
								left: 0,
								right: 0,
								top: 0,
								bottom: 10,
							}}
							data={userStats.taskStats}
							layout="vertical"
							barSize={32}
							barGap={2}
						>
							<XAxis type="number" dataKey="value" hide />
							<YAxis
								dataKey="activity"
								type="category"
								tickLine={false}
								tickMargin={4}
								axisLine={false}
								className="capitalize"
							/>
							<Bar dataKey="value" radius={5}>
								<LabelList
									position="insideLeft"
									dataKey="label"
									fill="white"
									offset={8}
									fontSize={12}
								/>
							</Bar>
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="flex flex-row border-t p-4">
					<div className="flex w-full items-center gap-2">
						<div className="grid flex-1 auto-rows-min gap-0.5">
							<div className="text-xs text-muted-foreground">
								Total Projects
							</div>
							<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
								{userStats.totalProjects}
							</div>
						</div>
						<Separator orientation="vertical" className="mx-2 h-10 w-px" />
						<div className="grid flex-1 auto-rows-min gap-0.5">
							<div className="text-xs text-muted-foreground">Pending</div>
							<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
								{userStats.pendingProjects}
								<span className="text-sm font-normal text-muted-foreground">
									/{userStats.totalProjects}
								</span>
							</div>
						</div>
						<Separator orientation="vertical" className="mx-2 h-10 w-px" />
						<div className="grid flex-1 auto-rows-min gap-0.5">
							<div className="text-xs text-muted-foreground">Completed</div>
							<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
								{userStats.completedProjects}
								<span className="text-sm font-normal text-muted-foreground">
									/{userStats.totalProjects}
								</span>
							</div>
						</div>
					</div>
				</CardFooter>
			</Card>
			<Card className="bg-transparent flex-grow" x-chunk="dashboard-05-chunk-1">
				<CardHeader className="pb-2">
					<CardDescription>Total Backlog</CardDescription>
					<CardTitle className="text-4xl">{userStats.totalBacklog}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">
						Total Number of backlog remaining across all projects
					</div>
				</CardContent>
				<CardFooter>
					<Progress
						value={(userStats.totalBacklog / userStats.totalTasks) * 100}
						aria-label={`Total Backlog: ${userStats.totalBacklog}`}
					/>
				</CardFooter>
			</Card>
		</div>
	);
}
