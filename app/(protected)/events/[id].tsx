import React from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { H1, Muted } from "@/components/ui/typography";

export default function EventDetails() {
  const { id } = useLocalSearchParams();

  const event = {
    id,
    title: "Event Title",
    date: "2024-09-15",
    description: "Event Description",
  };

  return (
    <View className="flex-1 bg-background p-4">
      <H1 className="mb-4">{event.title}</H1>
      <Muted className="mb-2">{event.date}</Muted>
      <Text>id: {id}</Text>
      <Text>{event.description}</Text>
    </View>
  );
}