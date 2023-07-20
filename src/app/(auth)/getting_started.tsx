import { ChevronLeft } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

export default function GettingStarted() {
  return (
    <View className="bg-white flex-1">
      <View className="mt-16 h-12 flex-row items-center px-4">
        <ChevronLeft size={32} color="#000" />
      </View>
      <View className="flex-1 items-center justify-between mb-16">
        <Text
          style={{ fontFamily: "Nunito_600SemiBold" }}
          className="text-[32px] top-28"
        >
          Getting Started
        </Text>
        <View className="w-full flex-col items-center gap-y-3 px-11">
          <Pressable className="w-full h-11 bg-permuta-primary items-center justify-center rounded-lg">
            <Text
              style={{ fontFamily: "Nunito_600SemiBold" }}
              className="text-white text-base"
            >
              Sign In
            </Text>
          </Pressable>
          <Pressable className="w-full h-11 border border-permuta-edge items-center justify-center rounded-lg">
            <View className="flex-row gap-x-3">
              <Image
                className="w-6 h-6"
                source={require("@/assets/icons/google-icon.png")}
              />
              <Text
                style={{ fontFamily: "Nunito_600SemiBold" }}
                className="text-[#344054] text-base"
              >
                Sign in with Google
              </Text>
            </View>
          </Pressable>
          <Pressable className="pt-2">
            <Text>
              Don’t have an account? <Text className="font-bold">Sign Up</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
