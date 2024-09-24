import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/auth-provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export { ErrorBoundary } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SafeAreaProvider>
					<Stack>
						<Stack.Screen name="(protected)" options={{ headerShown: false }} />
						<Stack.Screen name="(public)" options={{ headerShown: false }} />
					</Stack>
				</SafeAreaProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
