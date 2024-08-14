import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const { response, userSession } = await updateSession(request);

	const user = userSession;

	if (
		!user &&
		request.nextUrl.pathname !== "/" &&
		request.nextUrl.pathname !== "/auth" &&
		!request.nextUrl.href.startsWith(
			"https://tutnylhytdoaezfisskd.supabase.co"
		) &&
		!request.nextUrl.pathname.startsWith("/projects")
	) {
		return NextResponse.redirect(new URL("/auth", request.nextUrl));
	}

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
