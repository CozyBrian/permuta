import { View } from "react-native";
import React from "react";
import { HeaderWithBack } from "@/components/layout/header";
import ProfileSection from "@/components/profile/ProfileSection";
import ProfileItems from "@/components/profile/profile-items-section";
import { FillButton } from "@/components/buttons";

export default function MyProfile() {
  return (
    <View className="flex-1 bg-permuta-background">
      <HeaderWithBack title="Profile" centerTitle showBack={false} />
      <View className="pt-4 px-4 flex-1">
        <ProfileSection />
        <View className="flex my-1">
          <FillButton
            label="Edit Profile"
            className="bg-transparent"
            labelClassName="text-permuta-primary"
          />
        </View>
        <View className="flex my-1">
          <FillButton label="Add Item" />
        </View>
        <ProfileItems />
      </View>
    </View>
  );
}
