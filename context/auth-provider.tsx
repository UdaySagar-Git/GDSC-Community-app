import { Session } from "@supabase/supabase-js";
import { useRouter, useSegments, SplashScreen } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/config/supabase";
import { getUserDetailsById } from "@/actions/users";
import { User } from "@/actions/users";

SplashScreen.preventAutoHideAsync();

type AuthContextProps = {
	user: User | null;
	session: Session | null;
	initialized?: boolean;
	signUp: (email: string, password: string, name: string) => Promise<void>;
	signInWithPassword: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	session: null,
	initialized: false,
	signUp: async () => { },
	signInWithPassword: async () => { },
	signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();
	const segments = useSegments();
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [initialized, setInitialized] = useState<boolean>(false);

	const signUp = async (email: string, password: string, name: string) => {
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name,
					email,
					password,
				},
			},
		});
		if (error) {
			throw error;
		}
	};

	const signInWithPassword = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			throw error;
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			throw error;
		}
	};

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			setSession(session);
			if (session) {
				const userDetails = await getUserDetailsById(session.user.id);
				if (userDetails.success) {
					setUser(userDetails.data);
				}
			}
			setInitialized(true);
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (!initialized) {
			SplashScreen.preventAutoHideAsync();
			return;
		}

		const inProtectedGroup = segments[0] === "(protected)";

		if (session && !inProtectedGroup) {
			router.replace("/(protected)/home");
		} else if (!session) {
			router.replace("/(public)/welcome");
		}

		SplashScreen.hideAsync();
	}, [initialized, session]);

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				initialized,
				signUp,
				signInWithPassword,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
