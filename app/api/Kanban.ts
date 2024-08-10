import { createClient } from "@/utils/supabase/client";

export const addCard = async ({
	text,
	column,
	projectId,
}: {
	text: string;
	column: string;
	projectId: string;
}) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("card")
		.insert([{ cardContent: text, column, projectId }])
		.select("cardId, cardContent, column");

    return { data, error };
};

export const deleteCard = async (cardId: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("card").delete().eq("cardId", cardId);

  return { error };
};

export const getAllCards = async (projectId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("card")
    .select("cardId, cardContent, column")
    .eq("projectId", projectId);

  return { data, error };
};

export const moveCard = async (cardId: string, column: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("card")
    .update({ column })
    .eq("cardId", cardId);

  return { error };
};
