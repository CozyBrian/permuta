import { FillButton } from "@/components/buttons";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Home() {
  const dispatch = useAppDispatch();
  return (
    <View className="flex-1 bg-permuta-background items-center justify-center">
      <StatusBar />
      <Text>Permuta! huh</Text>
      <FillButton
        onPress={() => dispatch(action.auth.Logout())}
        className="w-[200px]"
        label="Logout"
      />
    </View>
  );
}
