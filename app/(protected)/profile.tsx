import React from "react";
import { View, Image, Text } from "react-native";
import { H1, Muted } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";

export default function Profile() {
	const { user, signOut } = useAuth();

	return (
		<View className="flex-1 bg-background p-4">
			<H1 className="mb-4">My Profile</H1>
			<Image
				source={require("@/assets/images/empty_avatar.jpg")}
				className="w-32 h-32 rounded-full mb-4 self-center"
			/>
			<Muted className="text-lg mb-2">Name: {user?.name}</Muted>
			<Muted className="text-lg mb-2">Email: {user?.email}</Muted>
			<Muted className="text-lg mb-4">Member since: {user?.phoneNumber}</Muted>
			<Button
				className="mt-4"
				onPress={() => {
					signOut();
				}}
			>
				<Text>Sign Out</Text>
			</Button>
		</View>
	);
}
