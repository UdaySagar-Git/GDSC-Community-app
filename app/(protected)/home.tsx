import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground } from "react-native";
import { H3 } from "@/components/ui/typography";
import domainData from "@/data/domainData.json";
import { Link, router } from "expo-router";

export interface Domain {
	image: string;
	title: string;
	description: string;
	slug: string;
	members: {
		name: string;
		role: string;
		image?: string;
		linkedin: string | null;
		github: string | null;
		instagram: string | null;
	}[];
}

export default function Home() {
	return (
		<ScrollView
			className="flex-1 bg-gray-100"
			showsVerticalScrollIndicator={false}
		>
			<ImageBackground
				source={{ uri: "https://gdsctaruc.github.io/images/homeBackground.jpg" }}
				className="flex items-center justify-center p-10"
				style={{ height: 500 }}
			>
				<View className="items-center">
					<Image
						source={{ uri: "https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png" }}
						style={{ width: 150, height: 200, resizeMode: "contain" }}
						className="mb-4"
					/>
					<Text className="text-gray-800 text-xl font-semibold text-center mb-2">Google Developer Student Clubs</Text>
					<Text className="text-gray-600 text-lg text-center mb-6">Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering & Technology</Text>
					<View className="flex-row justify-center">
						<Link href="https://www.linkedin.com/company/gdsc-vnrvjiet" className="mr-4">
							<Image
								source={{ uri: "https://cdn-icons-png.flaticon.com/512/174/174857.png" }}
								style={{ width: 30, height: 30, resizeMode: "contain", borderRadius: 7 }}
							/>
						</Link>
						<Link href="https://www.instagram.com/gdgc.vnrvjiet/">
							<Image
								source={{ uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png" }}
								style={{ width: 30, height: 30, resizeMode: "contain", borderRadius: 7 }}
							/>
						</Link>
					</View>
				</View>
			</ImageBackground>
			<View className="px-5 py-10">
				{domainData.map((domain, index) => (
					<TouchableOpacity
						key={index}
						className="bg-white rounded-lg shadow-md mb-5 overflow-hidden"
						onPress={() => router.push(`/domains/${domain.slug}`)}
					>
						<View className={`flex-row items-center p-4 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}>
							<Image
								source={{ uri: domain.image }}
								style={{ width: 100, height: 100, borderRadius: 8 }}
								className={index % 2 === 1 ? "ml-4" : "mr-4"}
							/>
							<View className="flex-1">
								<H3 className="text-xl font-bold mb-2">{domain.title}</H3>
								<Text className="text-sm text-gray-600" numberOfLines={3}>{domain.description}</Text>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
}