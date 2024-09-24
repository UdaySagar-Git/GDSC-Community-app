import React from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { H1, Muted } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import { getForums } from "@/actions/forums";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";

export default function Forums() {
  const { data: forums, isLoading } = useQuery({
    queryKey: ["forums"],
    queryFn: getForums,
  });

  const router = useRouter();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 bg-background p-4">
      <FlatList
        data={forums}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-4 p-4 bg-card rounded-lg flex-row items-center shadow-sm"
            onPress={() => router.push(`/forums/${item.id}`)}
          >
            <View className="flex-1">
              <Text className="text-lg font-semibold">{item.title}</Text>
              <Muted>By: {item.created_by?.name || "Unknown"}</Muted>
              <Muted>On: {dayjs(item.created_at).format("MMM D, YYYY h:mm A")}</Muted>
            </View>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>
        )}
      />
      <Button
        size="lg"
        onPress={() => router.push("/forum/new")}
        className="mt-4 flex flex-row items-center justify-center"
      >
        <AntDesign name="plus" size={24} color="white" className="mr-2" />
        <Text className="text-white font-semibold">Start a New Forum</Text>
      </Button>
    </View>
  );
}