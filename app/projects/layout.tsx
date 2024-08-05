import Sidebar from "@/components/custom/sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<Sidebar />
			<section className="pl-[200px]">{children}</section>
		</main>
	);
}
