import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const popMessage = (type: string, message: string) => {
	switch (type) {
		case "success":
			toast.success("Success", { description: message });
			break;
		case "error":
			toast.error("Error", { description: message });
			break;
		case "warning":
			toast.warning("Warning", { description: message });
			break;
		default:
			toast.message("Info", { description: message });
	}
};