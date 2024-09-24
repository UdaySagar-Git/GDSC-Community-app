import React from "react";
import { View, FlatList } from "react-native";
import { H1, Muted } from "@/components/ui/typography";

const events = [
	{ id: "1", title: "GDSC Meeting", date: "2024-09-15" },
	{ id: "2", title: "Web Development Workshop", date: "2024-09-22" },
	{ id: "3", title: "Mobile App Hackathon", date: "2024-10-05" },
];

export default function Events() {
	return (
		<View className="flex-1 bg-background p-4">
			<H1 className="mb-4">Upcoming Events</H1>
			<FlatList
				data={events}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View className="mb-4 p-4 bg-card rounded-lg">
						<Muted className="text-lg font-semibold">{item.title}</Muted>
						<Muted>{item.date}</Muted>
					</View>
				)}
			/>
		</View>
	);
}