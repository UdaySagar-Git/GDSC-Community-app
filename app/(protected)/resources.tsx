import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getResources } from "@/actions/resources";
import { H1, Muted } from "@/components/ui/typography";
import Loader from "@/components/Loader";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function Resources() {
  const router = useRouter();
  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  if (isLoading) return <Loader />;

  return (
    <View className="flex-1 bg-background p-4">
      <Text>
        <H1 className="mb-4 text-center">Resources</H1>
      </Text>
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/resources/${item.id}`)}
            className="mb-4 p-4 bg-white rounded-lg shadow-sm"
          >
            <Text className="text-lg font-semibold mb-2">{item.title}</Text>
            <Text>
              <Muted>Category: {item.category}</Muted>
            </Text>
          </TouchableOpacity>
        )}
      />
      <Button onPress={() => router.push("/new-resource")}>
        <Text>New Resource</Text>
      </Button>
    </View>
  );
}