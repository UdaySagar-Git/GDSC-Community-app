import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { useColorScheme } from "@/lib/useColorScheme";
import { theme } from "@/lib/constants";

export default function PublicLayout() {
	const { colorScheme } = useColorScheme();
	const pathname = usePathname();

	const isWelcomePage = pathname === "/welcome";
	const backgroundColor = isWelcomePage ? theme.light.background : (colorScheme === "dark" ? theme.dark.background : theme.light.background);
	const foregroundColor = isWelcomePage ? theme.light.foreground : (colorScheme === "dark" ? theme.dark.foreground : theme.light.foreground);

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor,
				},
				headerTintColor: foregroundColor,
				headerRight: () => (
					isWelcomePage ? null : (
						<View style={{ marginRight: 15 }}>
							<ThemeSwitch />
						</View>
					)
				),
			}}
		>
			<Stack.Screen
				name="welcome"
				options={{
					title: "Welcome",
					headerShown: false,
					contentStyle: { backgroundColor: theme.light.background },
					animation: "fade",
				}}
			/>
			<Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
			<Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
		</Stack>
	);
}