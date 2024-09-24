import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { Muted } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents, getPastEvents } from "@/actions/events";

interface Event {
  _id: string;
  isPast?: boolean;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  venue?: string;
  image?: string
}

export default function Events() {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const upcoming = await getUpcomingEvents();
      const past = await getPastEvents();
      setUpcomingEvents(upcoming);
      setPastEvents(past);
    };
    fetchEvents();
  }, []);

  const handlePress = (event: Event) => {
    router.push(`/events/${event._id}`);
  };

  return (
    <View className="flex-1 bg-background p-4">
      <View className="flex-row justify-around mb-4">
        <Button
          variant={showUpcoming ? "secondary" : "outline"}
          onPress={() => setShowUpcoming(true)}
        >
          <Text>Upcoming Events</Text>
        </Button>
        <Button variant={!showUpcoming ? "secondary" : "outline"} onPress={() => setShowUpcoming(false)}>
          <Text>Past Events</Text>
        </Button>
      </View>
      <FlatList
        data={showUpcoming ? upcomingEvents : pastEvents}
        keyExtractor={(item: Event) => item._id}
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
              <Muted>{item?.startDate}</Muted>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}