import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Auth() {
  return (
    <View className="flex-1 bg-[#3F65A1] items-center justify-center">
      <Text className="text-white text-2xl">Auth</Text>
      <Link href="/(main)/home" asChild>
        <Pressable className="items-center justify-center w-32 h-14 rounded-xl bg-sky-600">
          <Text className="text-center text-white">Permuta!</Text>
        </Pressable>
      </Link>
    </View>
  );
}
