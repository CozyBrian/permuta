import classNames from "classnames";
import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useClickOutside } from "react-native-click-outside";

type DropdownProps = {
  placeholder: string;
  className?: string;
  items: {
    label: string;
    value: string;
  }[];
  onChange?: (value: DropdownProps["items"][0]) => void;
};

const Dropdown = ({ placeholder, items, onChange }: DropdownProps) => {
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
            top: dropdownDimension.y + dropdownDimension.h + 12,
            left: dropdownDimension.x,
          }}
          className="absolute min-h-[44px] max-h-[176px] bg-white border border-permuta-edge rounded-lg"
        >
          <ScrollView className="w-full h-full">
            {items.map((item) => (
              <Pressable
                key={item.value}
                onPress={() => {
                  setisDropdownOpen(false);
                  setSelectedItem(item);
                }}
                className={classNames(
                  "w-full h-11 flex-row items-center justify-between px-4",
                  SelectedItem?.value === item.value
                    ? "bg-[#F2F2F2]"
                    : "bg-white"
                )}
              >
                <Text className="text-[#667085] text-base">{item.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;
