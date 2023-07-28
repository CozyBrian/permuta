import { useKeyboardStatus } from "@/hooks/useKeyboardStatus";
import { FlashList } from "@shopify/flash-list";
import classNames from "classnames";
import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useClickOutside } from "react-native-click-outside";

type DropdownProps = {
  placeholder: string;
  className?: string;
  isSearchable?: boolean;
  items: {
    label: string;
    value: string;
  }[];
  onChange?: (value: DropdownProps["items"][0]) => void;
  hasNextPage?: boolean;
  fetchNextPage?: (options?: any) => any;
  setSearchText?: (value: string) => void;
  searchText?: string;
};

const Dropdown = ({
  placeholder,
  items,
  onChange,
  isSearchable,
  fetchNextPage,
  hasNextPage,
  setSearchText,
  searchText,
}: DropdownProps) => {
  const [SelectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(
    null
  );
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const [dropdownDimension, setDropdownDimension] = useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });
  const dropdownRef = useRef<View>(null);
  const modalRef = useClickOutside<View>(() => setisDropdownOpen(false));

  const { isKeyboardVisible, metrics } = useKeyboardStatus();

  useEffect(() => {
    dropdownRef.current?.measureInWindow((x, y, w, h) => {
      const value = { x, y, w, h };
      setDropdownDimension(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownRef.current]);

  useEffect(() => {
    if (SelectedItem !== null) {
      onChange?.(SelectedItem);
    }
  }, [SelectedItem, onChange]);

  const top = () => {
    const { y, h } = dropdownDimension;
    const keyboardHeight = metrics?.height ?? 216;
    if (!isKeyboardVisible) {
      return y + h + 12;
    } else {
      if (y + h + 12 + 220 > keyboardHeight) {
        return y - 220;
      }
      return y + h + 12;
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => setisDropdownOpen(!isDropdownOpen)}
        ref={dropdownRef}
        className="static w-full h-11 flex-row items-center justify-between border border-permuta-edge rounded-lg px-4"
      >
        <Text
          className={classNames(
            "text-base",
            SelectedItem !== null ? "text-[#667085]" : "text-[#667085]"
          )}
        >
          {SelectedItem?.label ?? placeholder}
        </Text>
        <ChevronDown size={20} color="#667085" />
      </Pressable>
      <Modal
        visible={isDropdownOpen}
        transparent
        className="bg-transparent absolute"
      >
        <View
          ref={modalRef}
          style={{
            width: dropdownDimension.w,
            top: top(),
            left: dropdownDimension.x,
          }}
          className={classNames(
            "absolute min-h-[44px] bg-white border border-permuta-edge rounded-lg overflow-clip p-0.5",
            isSearchable ? "max-h-[220px]" : "max-h-[176px]"
          )}
        >
          {isSearchable ? (
            <>
              <TextInput
                placeholder="Search"
                placeholderTextColor="#667085"
                autoCapitalize="none"
                onChangeText={setSearchText}
                value={searchText}
                className="w-full h-11 border text-base leading-5 rounded-lg px-4 border-permuta-edge"
              />
              <View className="h-[170px]">
                <FlashList
                  data={items}
                  className="w-full max-h-[176px]"
                  renderItem={({ item }) => (
                    <Pressable
                      key={item.value}
                      onPress={() => {
                        setisDropdownOpen(false);
                        setSelectedItem(item);
                      }}
                      className={classNames(
                        "w-full h-11 flex-row items-center justify-between px-4 rounded-md",
                        SelectedItem?.value === item.value
                          ? "bg-[#F2F2F2]"
                          : "bg-white"
                      )}
                    >
                      <Text className="text-[#667085] text-base">
                        {item.label}
                      </Text>
                    </Pressable>
                  )}
                  keyExtractor={(item) => item.value}
                  estimatedItemSize={44}
                  onEndReached={() => {
                    if (hasNextPage) {
                      fetchNextPage!();
                    }
                  }}
                />
              </View>
            </>
          ) : (
            <ScrollView className="w-full h-full">
              {items.map((item) => (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    setisDropdownOpen(false);
                    setSelectedItem(item);
                  }}
                  className={classNames(
                    "w-full h-11 flex-row items-center justify-between px-4 rounded-md",
                    SelectedItem?.value === item.value
                      ? "bg-[#F2F2F2]"
                      : "bg-white"
                  )}
                >
                  <Text className="text-[#667085] text-base">{item.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;
