import {
	Dispatch,
	DragEvent,
	FormEvent,
	SetStateAction,
	useEffect,
	useState,
} from "react";

import { motion } from "framer-motion";

import { addCard, deleteCard, getAllCards, moveCard } from "@/app/api/Kanban";
import {
	AddCardProps,
	CardProps,
	CardType,
	ColumnProps,
	DropIndicatorProps,
} from "@/lib/interface";
import { popMessage } from "@/lib/utils";

import { FireExtinguisherIcon, PlusIcon, Trash2Icon } from "lucide-react";

export const Kanban = ({ projectId }: { projectId: string }) => {
	const [cards, setCards] = useState<CardType[]>([]);
	useEffect(() => {
		const fetchCards = async () => {
			try {
				const data = await getAllCards(projectId);
				if (data && data.data) {
					const cards = data.data.map((card) => {
						return {
							title: card.cardContent,
							id: card.cardId,
							column: card.column,
						};
					});
					setCards(cards);
				}
			} catch (error) {
				popMessage("error", (error as Error).message || "Error fetching cards");
			}
		};

		fetchCards();
	}, []);
	return (
		<div className="h-full w-full bg-background text-neutral-50">
			<Board cards={cards} setCards={setCards} projectId={projectId} />
		</div>
	);
};

const Board = ({
	projectId,
	cards,
	setCards,
}: {
	projectId: string;
	cards: CardType[];
	setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}) => {
	return (
		<div className="flex h-full w-full gap-3 p-12">
			<Column
				title="Backlog"
				column="backlog"
				headingColor="text-neutral-500 text-neutral-500"
				cards={cards}
				setCards={setCards}
				projectId={projectId}
			/>
			<Column
				title="TODO"
				column="todo"
				headingColor="text-yellow-200 text-yellow-600"
				cards={cards}
				setCards={setCards}
				projectId={projectId}
			/>
			<Column
				title="In progress"
				column="doing"
				headingColor="text-blue-200 text-blue-600"
				cards={cards}
				setCards={setCards}
				projectId={projectId}
			/>
			<Column
				title="Complete"
				column="done"
				headingColor="text-emerald-200 text-emerald-600"
				cards={cards}
				setCards={setCards}
				projectId={projectId}
			/>
			<BurnBarrel setCards={setCards} />
		</div>
	);
};

const Column = ({
	title,
	headingColor,
	cards,
	column,
	setCards,
	projectId,
}: ColumnProps) => {
	const [active, setActive] = useState(false);

	const handleDragStart = (e: DragEvent, card: CardType) => {
		e.dataTransfer.setData("cardId", card.id);
	};

	const handleDragEnd = (e: DragEvent) => {
		const cardId = e.dataTransfer.getData("cardId");

		setActive(false);
		clearHighlights();

		const indicators = getIndicators();
		const { element } = getNearestIndicator(e, indicators);

		const before = element.dataset.before || "-1";

		if (before !== cardId) {
			let copy = [...cards];

			let cardToTransfer = copy.find((c) => c.id === cardId);
			if (!cardToTransfer) return;
			cardToTransfer = { ...cardToTransfer, column };

			try {
				moveCard(cardToTransfer.id, column).then((data) => {
					if (data.error) throw data.error;
					copy = copy.filter((c) => c.id !== cardId);

					const moveToBack = before === "-1";

					if (moveToBack) {
						copy.push(cardToTransfer);
					} else {
						const insertAtIndex = copy.findIndex((el) => el.id === before);
						if (insertAtIndex === undefined) return;
						copy.splice(insertAtIndex, 0, cardToTransfer);
					}
					setCards(copy);
				});
			} catch (error) {
				popMessage("error", (error as Error).message || "Error moving card");
			}
		}
	};

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		highlightIndicator(e);

		setActive(true);
	};

	const clearHighlights = (els?: HTMLElement[]) => {
		const indicators = els || getIndicators();

		indicators.forEach((i) => {
			i.style.opacity = "0";
		});
	};

	const highlightIndicator = (e: DragEvent) => {
		const indicators = getIndicators();

		clearHighlights(indicators);

		const el = getNearestIndicator(e, indicators);

		el.element.style.opacity = "1";
	};

	const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
		const DISTANCE_OFFSET = 50;

		const el = indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();

				const offset = e.clientY - (box.top + DISTANCE_OFFSET);

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1],
			}
		);

		return el;
	};

	const getIndicators = () => {
		return Array.from(
			document.querySelectorAll(
				`[data-column="${column}"]`
			) as unknown as HTMLElement[]
		);
	};

	const handleDragLeave = () => {
		clearHighlights();
		setActive(false);
	};

	const filteredCards = cards.filter((c) => c.column === column);

	return (
		<div className="w-56 shrink-0">
			<div className="mb-3 flex items-center justify-between border-b pb-2">
				<h3 className={`font-medium dark:${headingColor}`}>{title}</h3>
				<span className="rounded text-sm dark:text-neutral-400 text-neutral-600">
					{filteredCards.length}
				</span>
			</div>
			<div
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`h-full w-full transition-colors ${
					active
						? "dark:bg-neutral-800/50 bg-neutral-300/50"
						: "bg-neutral-800/0"
				}`}
			>
				{filteredCards.map((c) => {
					return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
				})}
				<DropIndicator beforeId={null} column={column} />
				<AddCard projectId={projectId} column={column} setCards={setCards} />
			</div>
		</div>
	);
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.div
				layout
				layoutId={id}
				draggable="true"
				onDragStart={(e) => handleDragStart(e, { title, id, column })}
				className="cursor-grab rounded border border-neutral-700 bg-accent p-3 active:cursor-grabbing"
			>
				<p className="text-sm dark:text-neutral-100 text-neutral-800">
					{title}
				</p>
			</motion.div>
		</>
	);
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
	return (
		<div
			data-before={beforeId || "-1"}
			data-column={column}
			className="my-0.5 h-0.5 w-full opacity-0"
		/>
	);
};

const BurnBarrel = ({
	setCards,
}: {
	setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
	const [active, setActive] = useState(false);

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		setActive(true);
	};

	const handleDragLeave = () => {
		setActive(false);
	};

	const handleDragEnd = (e: DragEvent) => {
		const cardId = e.dataTransfer.getData("cardId");

		try {
			deleteCard(cardId).then((error) => {
				if (error) throw error;
				setCards((pv) => pv.filter((c) => c.id !== cardId));

				setActive(false);
			});
		} catch (error) {
			popMessage("error", (error as Error).message || "Error deleting card");
		}
	};

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
				active
					? "border-red-800 bg-red-800/20 dark:text-red-500 text-red-800"
					: "border-neutral-500 bg-neutral-500/20 text-neutral-500"
			}`}
		>
			{active ? (
				<FireExtinguisherIcon className="animate-bounce" />
			) : (
				<Trash2Icon />
			)}
		</div>
	);
};

const AddCard = ({ column, setCards, projectId }: AddCardProps) => {
	const [text, setText] = useState("");
	const [adding, setAdding] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!text.trim().length) return;

		try {
			addCard({ projectId, text: text.trim(), column }).then((data) => {
				if (data.error) throw data.error;
				if (data && data.data) {
					const newCard = {
						title: data.data[0].cardContent,
						id: data.data[0].cardId,
						column: data.data[0].column,
					};
					setCards((pv) => [...pv, newCard]);

					setAdding(false);
				}
			});
		} catch (error) {
			popMessage("error", (error as Error).message || "Error adding card");
		}
	};

	return (
		<>
			{adding ? (
				<motion.form layout onSubmit={handleSubmit}>
					<textarea
						onChange={(e) => setText(e.target.value)}
						autoFocus
						placeholder="Add new task..."
						className="w-full rounded border p-3 text-sm dark:text-neutral-50 text-neutral-900 placeholder-violet-300 focus:outline-0"
					/>
					<div className="mt-1.5 flex items-center justify-end gap-1.5">
						<button
							onClick={() => setAdding(false)}
							className="px-3 py-1.5 text-xs dark:text-neutral-400 text-neutral-900 transition-colors dark:hover:text-neutral-50"
						>
							Close
						</button>
						<button
							type="submit"
							className="flex items-center gap-1.5 rounded dark:bg-neutral-50 px-3 py-1.5 text-xs text-black transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-300"
						>
							<span>Add</span>
							<PlusIcon size={15} />
						</button>
					</div>
				</motion.form>
			) : (
				<motion.button
					layout
					onClick={() => setAdding(true)}
					className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-900 dark:text-neutral-400 transition-colors dark:hover:text-neutral-50"
				>
					<span>Add card</span>
					<PlusIcon size={15} />
				</motion.button>
			)}
		</>
	);
};
