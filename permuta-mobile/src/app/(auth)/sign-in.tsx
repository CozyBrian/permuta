import FillButton from "@/components/buttons/FillButton";
import { AuthHeader } from "@/components/layout/header";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Pressable, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ILoginPayload } from "@/types";
import classNames from "classnames";
import { userLogin } from "@/services/permuta";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { useState } from "react";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginPayload) => {
    setIsLoading(true);
    try {
      const { data: res } = await userLogin(data);

      return dispatch(
        action.auth.setAuth({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          isAuthenticated: true,
        })
      );
    } catch (error) {
      console.log(error);
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
              Login to Your Account
            </Text>
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
                    "w-full h-11 border  rounded-lg px-4 my-[14px]",
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
                  secureTextEntry={true}
                  className={classNames(
                    "w-full h-11 border  rounded-lg px-4",
                    errors.password ? "border-red-500" : "border-permuta-edge"
                  )}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="absolute bottom-[88px] text-red-500">
                This is required.
              </Text>
            )}
            <View className="w-full pt-4">
              <FillButton
                onPress={handleSubmit(onSubmit)}
                label="Sign In"
                className=""
                isLoading={isLoading}
              />
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
