import { View } from "react-native";
import { H1 } from "@/components/ui/typography";

export default function Home() {
	return (
		<View className="flex-1 items-center justify-center bg-background p-4 gap-y-4">
			<H1 className="text-center">Home Page</H1>
		</View>
	);
}
