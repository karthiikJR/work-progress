import Sidebar from "@/components/custom/Sidebar";

import { AuthProvider } from "@/components/context/AuthContext";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<AuthProvider>
				<Sidebar />
				<section className="pl-[200px]">{children}</section>
			</AuthProvider>
		</main>
	);
}
