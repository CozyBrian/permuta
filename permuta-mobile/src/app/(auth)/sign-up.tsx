import FillButton from "@/components/buttons/FillButton";
import { AuthHeader } from "@/components/layout/header";
import { Link, router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { IRegisterPayload } from "@/types";
import { useState } from "react";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import classNames from "classnames";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPayload>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      full_name: "",
      phone_number: "",
    },
  });

  const onSubmit = async (data: IRegisterPayload) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
      dispatch(
        action.auth.setRegisterData({
          email: data.email,
          password: data.password,
          username: data.username,
        })
      );
      router.push("/(auth)/fill-your-profile");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={"#667085"}
                  autoCapitalize="none"
                  className={classNames(
                    "w-full h-11 border text-base leading-5 rounded-lg px-4 mt-[14px]",
                    errors.username ? "border-red-500" : "border-permuta-edge"
                  )}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={"#667085"}
                  autoCapitalize="none"
                  className={classNames(
                    "w-full h-11 border text-base leading-5 rounded-lg px-4 mt-[14px]",
                    errors.email ? "border-red-500" : "border-permuta-edge"
                  )}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={"#667085"}
                  autoCapitalize="none"
                  secureTextEntry
                  className={classNames(
                    "w-full h-11 border text-base leading-5 rounded-lg px-4 mt-[14px]",
                    errors.password ? "border-red-500" : "border-permuta-edge"
                  )}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            <View className="w-full pt-4">
              <FillButton
                onPress={handleSubmit(onSubmit)}
                label="Sign Up"
                isLoading={isLoading}
              />
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
