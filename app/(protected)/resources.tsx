import React from "react";
import { View, FlatList } from "react-native";
import { H1, Muted } from "@/components/ui/typography";

const resources = [
  { id: "1", title: "React Native Documentation", category: "Mobile Development" },
  { id: "2", title: "Supabase Tutorial", category: "Backend" },
  { id: "3", title: "TypeScript Handbook", category: "Programming Languages" },
];

export default function Resources() {
  return (
    <View className="flex-1 bg-background p-4">
      <H1 className="mb-4">Learning Resources</H1>
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-card rounded-lg">
            <Muted className="text-lg font-semibold">{item.title}</Muted>
            <Muted>Category: {item.category}</Muted>
          </View>
        )}
      />
    </View>
  );
}