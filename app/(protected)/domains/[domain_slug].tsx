import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { H1, H2, Muted } from "@/components/ui/typography";
import domainData from "@/data/domainData.json";

export default function DomainDetails() {
  const { domain_slug } = useLocalSearchParams<{ domain_slug: string }>();
  const domainDetails = domainData.find((domain) => domain.slug === domain_slug);
  if (!domainDetails) return <Text>Domain not found</Text>;

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="relative">
        <Image
          source={{ uri: domainDetails.image }}
          style={{ width: screenWidth, height: screenWidth * 0.6 }}
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 p-4">
          <H1 className="text-white text-center">{domainDetails.title}</H1>
        </View>
      </View>
      <View className="p-6">
        <Muted className="text-justify mb-8 text-lg">{domainDetails.description}</Muted>
        <H2 className="mb-6 text-center text-2xl">Team Members</H2>
        <View className="flex-row flex-wrap justify-center">
          {domainDetails.members.map((member, index) => (
            <View key={index} className="w-1/2 p-3 items-center mb-6">
              <Image
                source={{ uri: member.image }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
                alt={`${member.name}'s profile picture`}
              />
              <Text className="text-center mt-3 font-bold text-lg">{member.name}</Text>
              <Text className="text-center text-sm text-gray-600 mt-1">{member.role}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}