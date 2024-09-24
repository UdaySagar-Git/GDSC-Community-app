import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/auth-provider";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
	return (
		<AuthProvider>
			<SafeAreaProvider>
				<Stack>
					<Stack.Screen name="(protected)" options={{ headerShown: false }} />
					<Stack.Screen name="(public)" options={{ headerShown: false }} />
				</Stack>
			</SafeAreaProvider>
		</AuthProvider>
	);
}
