import React from "react";
import { Tabs, useRouter } from "expo-router";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();
	const router = useRouter();

	const backgroundColor = colorScheme === "dark" ? theme.dark.background : theme.light.background;
	const foregroundColor = colorScheme === "dark" ? theme.dark.foreground : theme.light.foreground;

	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor,
				},
				headerTintColor: foregroundColor,
				headerLeft: () => (
					<TouchableOpacity onPress={() => router.push("/home")}>
						<Image
							source={require("@/assets/images/gdsc-logo.gif")}
							style={{ width: 50, height: 40, marginLeft: 15 }}
						/>
					</TouchableOpacity>
				),
				headerRight: () => (
					<View style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
						<TouchableOpacity onPress={() => router.push("/notifications")} style={{ marginRight: 15 }}>
							<Ionicons name="notifications" size={24} color={foregroundColor} />
						</TouchableOpacity>
						<ThemeSwitch />
					</View>
				),
				tabBarStyle: {
					backgroundColor,
				},
				tabBarActiveTintColor: colorScheme === "dark" ? theme.dark.primary : theme.light.primary,
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
				name="events"
				options={{
					title: "Events",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="forums"
				options={{
					title: "Forums",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="chatbubbles" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="resources"
				options={{
					title: "Resources",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="book" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "My Profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen name="notifications" options={{
				href: null,
				headerTitle: "Notifications",
			}} />
			<Tabs.Screen name="events/[id]" options={{
				href: null,
				headerTitle: "Event Details",
			}} />
			<Tabs.Screen name="forum/new" options={{
				href: null,
				headerTitle: "New Forum",
			}} />
			<Tabs.Screen name="forums/[id]" options={{
				href: null,
				headerTitle: "Forum Details",
			}} />
			<Tabs.Screen name="domains/[domain_slug]" options={{
				href: null,
				headerTitle: "Details"
			}} />
		</Tabs>
	);
}