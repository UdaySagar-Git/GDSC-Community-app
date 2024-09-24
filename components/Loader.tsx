import React from "react";
import { View, Image } from "react-native";

const Loader = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image source={require("@/assets/images/google-loader.gif")} style={{ width: 120, height: 120 }} />
    </View>
  );
};

export default Loader;
