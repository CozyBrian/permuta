import { FONT } from "@/assets/font";
import WelcomeBanner from "@/components/home/banner";
import SearchInput from "@/components/inputs/SearchInput";
import { Header } from "@/components/layout/header";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-permuta-background items-center">
      <Header />
      <View className="flex-1 w-full p-4">
        <SearchInput />
        <WelcomeBanner />
        <Text
          style={{ fontFamily: FONT.NunitoSans.Bold }}
          className="text-2xl leading-7 mt-[32px] uppercase"
        >
          Around You
        </Text>
      </View>
    </View>
  );
}
