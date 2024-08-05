import React from "react";

function Heading({
	heading,
	description,
}: {
	heading: string;
	description?: string;
}) {
	return (
		<div className="mb-8 flex flex-col items-start gap-2 md:items-end">
			<h2 className="mt-10 w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				{heading}
			</h2>
			{description && (
				<p className="w-full text-sm text-muted-foreground">{description}</p>
			)}
		</div>
	);
}

export default Heading;
