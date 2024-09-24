import React from "react";
import { View, FlatList } from "react-native";
import { H1, Muted } from "@/components/ui/typography";

const notifications = [
  { id: "1", message: "New event: Web Development Workshop", date: "2024-09-24" },
  { id: "2", message: "Your forum post has a new reply", date: "2024-09-23" },
  { id: "3", message: "Don't forget: Mobile App Hackathon next week!", date: "2024-09-22" },
];

export default function Notifications() {
  return (
    <View className="flex-1 bg-background p-4">
      <H1 className="mb-4">Notifications</H1>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-card rounded-lg">
            <Muted className="text-lg">{item.message}</Muted>
            <Muted>{item.date}</Muted>
          </View>
        )}
      />
    </View>
  );
}