import { FillButton } from "@/components/buttons";
import { AuthHeader } from "@/components/layout/header";
import Dropdown from "@/components/inputs/Dropdown";
import { Link } from "expo-router";
import { View } from "react-native";

export default function FillYourProfile2() {
  return (
    <View className="flex-1 bg-white">
      <AuthHeader title="Fill Your Profile" />
      <View className="flex-1 p-4">
        <View className="flex-1 flex-col items-center">
          <View className="w-full gap-y-3">
            <View>
              <Dropdown
                placeholder="Hostel"
                items={[
                  {
                    label: "Prestige Hostel",
                    value: "level-100",
                  },
                  {
                    label: "Victory Towers Hostel",
                    value: "level-200",
                  },
                ]}
              />
            </View>
            <View>
              <Dropdown
                placeholder="Level"
                items={[
                  {
                    label: "Level 100",
                    value: "level-100",
                  },
                  {
                    label: "Level 200",
                    value: "level-200",
                  },
                  {
                    label: "Level 300",
                    value: "level-300",
                  },
                  {
                    label: "Level 400",
                    value: "level-400",
                  },
                ]}
              />
            </View>
          </View>
          <Link
            href="/(auth)/fill-your-profile"
            className="absolute bottom-10"
            asChild
          >
            <FillButton label="Complete" />
          </Link>
        </View>
      </View>
    </View>
  );
}
