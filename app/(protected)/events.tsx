import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { Muted } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents, getPastEvents } from "@/actions/events";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { Event } from "@/actions/events";
import dayjs from "dayjs";

export default function Events() {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const router = useRouter();

  const { data: upcomingEvents, isLoading: isUpcomingEventsLoading } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: getUpcomingEvents,
  });

  const { data: pastEvents, isLoading: isPastEventsLoading } = useQuery({
    queryKey: ["pastEvents"],
    queryFn: getPastEvents,
  });


  const handlePress = (event: Event) => {
    router.push(`/events/${event.id}`);
  };

  return (
    <View className="flex-1 bg-background p-4">
      <View className="flex-row justify-around mb-4 gap-4">
        <Button
          className="w-1/2"
          variant={showUpcoming ? "secondary" : "outline"}
          onPress={() => setShowUpcoming(true)}
        >
          <Text className={showUpcoming ? "text-black font-semibold" : "text-gray-500"}>Upcoming Events</Text>
        </Button>
        <Button
          className="w-1/2"
          variant={!showUpcoming ? "secondary" : "outline"}
          onPress={() => setShowUpcoming(false)}
        >
          <Text className={!showUpcoming ? "text-black font-semibold" : "text-gray-500"}>Past Events</Text>
        </Button>
      </View>
      {
        isUpcomingEventsLoading || isPastEventsLoading ? <Loader /> :
          <FlatList
            data={showUpcoming ? upcomingEvents : pastEvents}
            keyExtractor={(item: Event) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item)}>
                <View className="mb-4 p-4 bg-card rounded-lg shadow-sm">
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: "100%", height: 200, borderRadius: 8, resizeMode: "cover" }}
                    />
                  )}
                  <Muted className="text-lg font-semibold">{item?.name}</Muted>
                  <Muted>{item?.startDate ? dayjs(item?.startDate).format("MMM D, YYYY") : "To be announced"}</Muted>
                </View>
              </TouchableOpacity>
            )}
          />
      }
    </View>
  );
}