import { useRouter } from "expo-router";
import React from "react";
import { View, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { theme } from "@/lib/constants";

export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex flex-1 justify-between p-6" style={{ backgroundColor: theme.light.background }}>
			<Animated.View
				entering={FadeInDown.delay(300).duration(1000)}
				className="flex-1 items-center justify-center"
			>
				<Image
					source={require("@/assets/images/gdsc-logo.gif")}
					style={{ width: 240, height: 180, marginBottom: 5 }}
				/>
				<H1 className="text-center text-3xl font-bold mb-4" style={{ color: theme.light.foreground }}>Welcome to Community</H1>
				<Muted className="text-center text-lg mb-10" style={{ color: theme.light["muted-foreground"] }}>Google Developer Student Clubs</Muted>
			</Animated.View>
			<Animated.View
				entering={FadeInDown.delay(600).duration(1000)}
				className="w-full"
			>
				<View className="flex flex-col gap-y-4 mb-4">
					<Button
						className="w-full"
						size="lg"
						variant="outline"
						onPress={() => router.push("/sign-in")}
					>
						<Text className="text-lg font-semibold text-gray-700">Sign In</Text>
					</Button>
					<Button
						className="w-full"
						size="lg"
						variant="secondary"
						onPress={() => router.push("/sign-up")}
					>
						<Text className="text-lg font-semibold text-gray-700">Sign Up</Text>
					</Button>
				</View>
			</Animated.View>
		</SafeAreaView>
	);
}