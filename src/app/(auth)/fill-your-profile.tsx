import { FillButton } from "@/components/buttons";
import { AuthHeader } from "@/components/layout/header";
import Dropdown from "@/components/inputs/Dropdown";
import { Link } from "expo-router";
import { Edit2 } from "lucide-react-native";
import { TextInput, View } from "react-native";

export default function FillYourProfile() {
  return (
    <View className="flex-1 bg-white">
      <AuthHeader title="Fill Your Profile" />
      <View className="flex-1 p-4">
        <View className="flex-1 flex-col items-center">
          <View className="mt-6 mb-8 w-32 h-32">
            <View className="w-full h-full rounded-full bg-[#A5C7E6]"></View>
            <View className="absolute bottom-0 right-0 w-8 h-8 items-center justify-center rounded-md bg-permuta-primaryDark">
              <Edit2 size={16} color="#fff" />
            </View>
          </View>
          <View className="w-full gap-y-3">
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border border-permuta-edge rounded-lg px-4"
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border border-permuta-edge rounded-lg px-4"
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border border-permuta-edge rounded-lg px-4"
            />
            <TextInput
              placeholder="Phone"
              placeholderTextColor={"#667085"}
              className="w-full h-11 border border-permuta-edge rounded-lg px-4"
            />
            <View>
              <Dropdown
                placeholder="Male"
                items={[
                  {
                    label: "Male",
                    value: "m",
                  },
                  {
                    label: "Female",
                    value: "f",
                  },
                  {
                    label: "Other",
                    value: "o",
                  },
                ]}
              />
            </View>
          </View>
          <Link
            href="/(auth)/fill-your-profile-2"
            className="absolute bottom-10"
            asChild
          >
            <FillButton label="Next" />
          </Link>
        </View>
      </View>
    </View>
  );
}
