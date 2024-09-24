import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";
import dayjs from "dayjs";

export default function Profile() {
	const { user, signOut } = useAuth();

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="items-center p-6">
				<Image
					source={user?.image ? { uri: user.image } : require("@/assets/images/empty_avatar.jpg")}
					className="w-32 h-32 rounded-full mb-6 border-4 border-white shadow-md"
				/>
				<View className="w-full bg-white rounded-xl shadow-lg p-6 mb-6">
					<InfoItem label="Name" value={user?.name} />
					<InfoItem label="Username" value={user?.username} />
					<InfoItem label="Email" value={user?.email} />
					<InfoItem label="Role" value={user?.role} />
					<InfoItem label="Phone Number" value={user?.phoneNumber} />
					<InfoItem label="Member since" value={dayjs(user?.created_at).format("MMM D, YYYY")} />
				</View>
				<Button
					className="w-full bg-red-500 py-4 rounded-lg shadow-md"
					onPress={() => {
						signOut();
					}}
					variant="destructive"
				>
					<Text className="text-white font-bold text-center text-lg">Sign Out</Text>
				</Button>
			</View>
		</ScrollView>
	);
}

const InfoItem: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
	<View className="flex-row justify-between items-center mb-4 pb-2 border-b border-gray-200">
		<Text className="text-gray-700 font-semibold text-lg">{label}:</Text>
		<Text className="text-gray-600 text-lg">{value}</Text>
	</View>
);
