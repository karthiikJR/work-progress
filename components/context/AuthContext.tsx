"use client";

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { popMessage } from "@/lib/utils";
import { onSubmitLogout } from "@/utils/supabase/action";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface AuthContextType {
	userId: string;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	userId: "",
	logout: () => {},
	loading: true,
});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const supabase = createClient();
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState("");
	const router = useRouter();

	useEffect(() => {
		getSession();
	}, []);

	const getSession = async () => {
		try {
			setLoading(true);
			const { data: sessionData, error } = await supabase.auth.getSession();
			if (error) throw error;
			if (sessionData.session) {
				setUserId(sessionData.session.user.id);
			} else {
				popMessage("error", "User not logged in");
				router.push("/auth");
			}
		} catch (error) {
			popMessage("error", (error as Error)?.message || "Failed to get session");
		} finally {
			setLoading(false);
		}
	};
	const logout = async () => {
		try {
			setLoading(true);
			await onSubmitLogout();
			popMessage("success", "Logged out successfully");
		} catch (error) {
			popMessage("error", (error as Error)?.message || "Failed to logout");
		} finally {
			setLoading(false);
		}
	};

	const value = useMemo(() => ({ userId, logout, loading }), [userId, loading]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
