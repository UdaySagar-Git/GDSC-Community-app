import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { H1, Muted } from "@/components/ui/typography";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import dayjs from "dayjs";
import { getForumById, getMessagesByForumId, createMessage } from "@/actions/forums";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { AntDesign } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export default function ForumDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { data: forum, isLoading: forumLoading } = useQuery({
    queryKey: ["forum", id],
    queryFn: () => getForumById(id),
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessagesByForumId(id),
  });

  const mutation = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
      form.reset();
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutation.mutate({ message: data.message, forumId: id });
  };

  if (forumLoading || messagesLoading) return <Loader />;

  if (!forum) return <Text>Forum not found</Text>;

  return (
    <View className="flex-1 bg-background p-4">
      <ScrollView className="flex-1">
        <View className="mb-4 p-4 bg-card rounded-lg shadow-sm">
          <View className="flex flex-row justify-between items-center">
            <Text className="font-semibold text-lg">{forum.title}</Text>
            <Muted className="text-sm">By {forum.created_by?.name || "Unknown"}</Muted>
          </View>
        </View>
        <View className="mb-4">
          {messages?.map((msg) => (
            <View key={msg.id} className="mb-2 p-2 bg-card rounded-lg flex-row shadow-sm">
              <Image
                source={msg.user?.image ? { uri: msg.user.image } : require("@/assets/images/empty_avatar.jpg")}
                className="w-8 h-8 rounded-full mr-2"
              />
              <View className="flex-1">
                <View className="flex flex-row justify-between items-center">
                  <Text className="font-semibold">{msg.user?.name || "Unknown"}</Text>
                  <Muted>{dayjs(msg.created_at).format("MMM D, YYYY h:mm A")}</Muted>
                </View>
                <Text className="text-sm mt-2">{msg.message}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Form {...form}>
        <View className="flex-row items-center ">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormInput
                placeholder="Type your message"
                {...field}
                className="flex-1 w-[80vw] mr-2"
              />
            )}
          />
          <Button
            size="icon"
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            <AntDesign name="caretright" size={24} color="white" />
          </Button>
        </View>
      </Form>
    </View>
  );
}