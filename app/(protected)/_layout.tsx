import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();
	const backgroundColor = colorScheme === "dark" ? theme.dark.background : theme.light.background;
	const foregroundColor = colorScheme === "dark" ? theme.dark.foreground : theme.light.foreground;

	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor,
				},
				headerTintColor: foregroundColor,
				headerRight: () => (
					<View style={{ marginRight: 15 }}>
						<ThemeSwitch />
					</View>
				),
				tabBarStyle: {
					backgroundColor,
				},
				tabBarActiveTintColor:
					colorScheme === "dark"
						? theme.dark.primary
						: theme.light.primary,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-sharp" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
