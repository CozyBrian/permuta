import FillButton from "@/components/buttons/FillButton";
import AuthHeader from "@/components/header/authHeader";
import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignUp() {
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
              Create Your Account
            </Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border text-base border-permuta-edge rounded-lg px-4"
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border text-base border-permuta-edge rounded-lg px-4"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border text-base border-permuta-edge rounded-lg px-4"
            />
            <View className="w-full pt-4">
              <FillButton label="Sign Up" className="" />
            </View>
            <Link href="/(auth)/sign-in" replace asChild>
              <Pressable className="pt-2">
                <Text>
                  Already have an account?{" "}
                  <Text className="font-bold">Sign In</Text>
                </Text>
              </Pressable>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
