import { FillButton } from "@/components/buttons";
import { HeaderWithBack } from "@/components/layout/header";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { Text, View } from "react-native";

export default function Settings() {
  const dispatch = useAppDispatch();
  return (
    <View>
      <HeaderWithBack title="Settings" />
      <Text>Settings</Text>
      <FillButton
        className="bg-red-500"
        label="Logout"
        onPress={() => dispatch(action.auth.Logout())}
      />
    </View>
  );
}
