import { FONT } from "@/assets/font";
import WelcomeBanner from "@/components/home/banner";
import SearchInput from "@/components/inputs/SearchInput";
import { Header } from "@/components/layout/header";
import { Heart } from "lucide-react-native";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-permuta-background items-center">
      <Header />
      <View className="flex-1 w-full p-4 pb-0">
        <FlatList
          className="h-full -mx-2 -my-2"
          ListHeaderComponent={() => (
            <View className="px-2">
              <SearchInput />
              <WelcomeBanner />
              <Text
                style={{ fontFamily: FONT.NunitoSans.Bold }}
                className="text-2xl leading-7 mt-[32px] uppercase"
              >
                Around You
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: insets.bottom + 74 }}
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => (
            <View className="flex-1 mx-2 my-2">
              <View className="w-full aspect-[6/5] bg-permuta-primary rounded-2xl"></View>
              <View className="flex-col pt-1">
                <Text numberOfLines={1} className="text-ellipsis">
                  Brand New Oraimo Earbuds
                </Text>
                <View className="pt-1 flex-row items-end justify-between">
                  <Text
                    style={{ fontFamily: FONT.Nunito.Medium }}
                    className="text-lg text-gray-500"
                  >
                    GH₵60.99
                  </Text>
                  <Heart size={24} color="#7D7D7D" />
                </View>
              </View>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => `item-${item}`}
        />
      </View>
    </View>
  );
}
