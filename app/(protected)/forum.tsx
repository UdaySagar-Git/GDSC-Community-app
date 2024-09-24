import React from "react";
import { View, FlatList } from "react-native";
import { H1, Muted } from "@/components/ui/typography";

const topics = [
  { id: "1", title: "Best practices for React Native", author: "Uday", replies: 5 },
  { id: "2", title: "How to use Supabase with Expo", author: "Sagar", replies: 3 },
  { id: "3", title: "Tips for acing technical interviews", author: "Ram", replies: 7 },
];

export default function Forum() {
  return (
    <View className="flex-1 bg-background p-4">
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-card rounded-lg">
            <Muted className="text-lg font-semibold">{item.title}</Muted>
            <Muted>By: {item.author}</Muted>
            <Muted>Replies: {item.replies}</Muted>
          </View>
        )}
      />
    </View>
  );
}