import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "@/actions/events";
import Loader from "@/components/Loader";
import dayjs from "dayjs";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });

  if (isLoading) return <Loader />;

  if (!event) return <Text>Event not found</Text>;

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <H1 className="mb-4 text-center">{event.name}</H1>
      <View className="mb-4 flex flex-row justify-between">
        <Muted className="text-center">{dayjs(event.startDate).format("MMM D, YYYY")}</Muted>
        <Muted className="text-center">{dayjs(event.endDate).format("MMM D, YYYY")}</Muted>
      </View>
      {event.image && (
        <Image
          source={{ uri: event.image }}
          style={{ width: "100%", height: 300, borderRadius: 15, marginBottom: 20 }}
        />
      )}
      <View className="mb-4">
        {event.venue && (
          <Text className="text-left font-semibold">
            Venue: {event.venue}
          </Text>
        )}
      </View>
      <Text className="text-justify">{event.description}</Text>
    </ScrollView>
  );
}