import { Dispatch, SetStateAction } from "react";

export type ColumnType = "backlog" | "todo" | "doing" | "done";

export type CardType = {
	title: string;
	id: string;
	column: ColumnType;
};

export type CardProps = CardType & {
	handleDragStart: Function;
};

export type AddCardProps = {
	column: ColumnType;
	setCards: Dispatch<SetStateAction<CardType[]>>;
	projectId: string;
};

export type DropIndicatorProps = {
	beforeId: string | null;
	column: string;
};



export type ColumnProps = {
	title: string;
	headingColor: string;
	cards: CardType[];
	column: ColumnType;
	setCards: Dispatch<SetStateAction<CardType[]>>;
	projectId: string;
};

export type ProjectProps = {
	projectId: string;
	projectName: string;
	projectDetails: string;
};

export type UserProfile = {
	id: string;
	email: string;
	avatarUrl?: string;
	displayName: string;
};

export interface UserStats {
	taskStats: {
		activity: string;
		value: number;
		label: string;
		fill: string;
	}[];
	totalProjects: number;
	completedProjects: number;
	pendingProjects: number;
	totalTasks: number;
	totalBacklog: number;
}