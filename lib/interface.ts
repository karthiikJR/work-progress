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
};

export type DropIndicatorProps = {
	beforeId: string | null;
	column: string;
};
