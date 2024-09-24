import React from "react";
import { View, ScrollView } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResource } from "@/actions/resources";
import { useRouter } from "expo-router";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "react-native";

const formSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  category: z.string().min(1, "Category cannot be empty"),
});

type FormData = z.infer<typeof formSchema>;

export default function NewResource() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      category: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createResource,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      router.push(`/resources/${res?.id}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    mutation.mutate(data as any);
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="mb-4 text-center text-lg">Create a New Resource</Text>
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormInput
              label="Resource Title"
              placeholder="Enter resource title"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <View>
              <Text>Description (Markdown supported)</Text>
              <TextInput
                className="min-h-[60px] w-full border border-gray-100 rounded-lg bg-transparent px-3 py-2 text-sm shadow-sm"
                placeholder="Enter resource description"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={field.value}
                onChangeText={field.onChange}
              />
            </View>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormInput
              label="Resource URL (optional)"
              placeholder="Enter resource URL"
              {...field}
              value={field.value || ""}
            />
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormInput
              label="Resource Category"
              placeholder="Enter resource category"
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
          <Text className="text-white font-semibold">Create Resource</Text>
        </Button>
      </Form>
      {mutation.isError && <Text className="text-red-500 mt-2">Error creating resource</Text>}
    </ScrollView>
  );
}
