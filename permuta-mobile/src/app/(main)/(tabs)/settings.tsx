import { FillButton } from "@/components/buttons";
import { HeaderWithBack } from "@/components/layout/header";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <HeaderWithBack title="Settings" />
      <View className="px-4 h-full flex-1 ">
        <Text>Work in progress</Text>
        <View
          style={{ paddingBottom: insets.bottom * 3.5 }}
          className="w-full left-4 absolute bottom-0"
        >
          <FillButton
            className="bg-red-500 w-full"
            label="Logout"
            onPress={() => dispatch(action.auth.Logout())}
          />
        </View>
      </View>
    </View>
  );
}
