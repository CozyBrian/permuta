import { Link } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";

const Triangle = require("@/assets/images/triangle.png");

export default function Auth() {
  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={Triangle}
        className="flex-1 absolute -right-24 w-full h-full bg-contain"
      ></ImageBackground>
      <View className="absolute top-1/4 px-6">
        <Text style={{ fontFamily: "Nunito_600SemiBold" }} className="text-5xl">
          Welcome <Text className="text-[40px]">👋</Text>
        </Text>
        <Text
          style={{ fontFamily: "Nunito_600SemiBold" }}
          className="text-5xl pt-1"
        >
          to <Text className="text-permuta-primary">Permuta</Text>
        </Text>
        <Text
          style={{ fontFamily: "Nunito_500Medium" }}
          className="text-sm w-fit"
        >
          Seamlessly Buy, Sell, and Trade {"\n"}within your Hostel Network
        </Text>
      </View>
      <View className="absolute bottom-[15%] w-full px-10">
        <Link href="/(auth)/getting_started" asChild>
          {/* <FillButton
            label="Get Started"
            className="w-full h-14 items-center justify-center bg-permuta-primaryDark rounded-2xl"
          /> */}
          <Pressable className="w-full h-14 items-center justify-center bg-permuta-primaryDark rounded-2xl">
            <Text
              style={{ fontFamily: "Nunito_500Medium" }}
              className="text-base text-white"
            >
              Get Started
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
