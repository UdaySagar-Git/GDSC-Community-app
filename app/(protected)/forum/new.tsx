import React from "react";
import { View } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createForum } from "@/actions/forums";
import { useRouter } from "expo-router";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
});

export default function NewForum() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createForum,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["forums"] });
      router.push(`/forums/${res?.id}`);
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data.title);
  };

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="mb-4 text-center text-lg">Start a New Forum</Text>
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormInput
              label="Forum Title"
              placeholder="Enter forum title"
              {...field}
            />
          )}
        />
        <Button
          size="lg"
          onPress={form.handleSubmit(onSubmit)}
          disabled={form.formState.isSubmitting}
          className="mt-4"
        >
          <Text className="text-white font-semibold">Create Forum</Text>
        </Button>
      </Form>
      {mutation.isError && <Text className="text-red-500 mt-2">Error creating forum</Text>}
    </View>
  );
}