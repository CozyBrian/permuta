import FillButton from "@/components/buttons/FillButton";
import AuthHeader from "@/components/header/authHeader";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SignIn() {
  return (
    <View className="bg-white flex-1">
      <AuthHeader />
      <View className="flex-1 items-center justify-center">
        <KeyboardAvoidingView
          className="w-full"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-col gap-y-[14px] items-center w-full px-9">
            <Text
              style={{ fontFamily: "Nunito_600SemiBold" }}
              className="text-2xl pb-2"
            >
              Login to Your Account
            </Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border border-permuta-edge rounded-lg px-4"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border border-permuta-edge rounded-lg px-4"
            />
            <View className="w-full pt-4">
              <FillButton label="Sign In" className="" />
            </View>
            <Link href="/(auth)/sign-up" replace asChild>
              <Pressable className="pt-2">
                <Text>
                  Don’t have an account?{" "}
                  <Text className="font-bold">Sign Up</Text>
                </Text>
              </Pressable>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
