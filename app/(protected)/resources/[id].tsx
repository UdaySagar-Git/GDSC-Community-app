import React from "react";
import { View, ScrollView, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getResource } from "@/actions/resources";
import { H1, Muted } from "@/components/ui/typography";
import Markdown from "react-native-markdown-display";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function ResourceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: resource, isLoading } = useQuery({
    queryKey: ["resource", id],
    queryFn: () => getResource(id),
  });

  if (isLoading) return <Loader />;

  if (!resource) return <Muted>Resource not found</Muted>;

  const handleOpenURL = () => {
    if (resource.url) {
      Linking.openURL(resource.url);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <H1 className="mb-4 text-center">{resource.title}</H1>
      <Text className="mb-2">Category: {resource.category}</Text>
      <Muted>Created at: {new Date(resource.created_at).toLocaleDateString()}</Muted>
      <View className="mb-4">
        <Markdown>{resource.description}</Markdown>
      </View>
      {resource.url && (
        <Button onPress={handleOpenURL} variant="outline" className="mb-4">
          <Text>Open Resource</Text>
        </Button>
      )}
    </ScrollView>
  );
}
