import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { TextInput } from "react-native";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

type ControlledInputProps<T extends FieldValues> = {
  placeholder?: string;
  name: Path<T>;
  control: Control<T, any>;
  errors: FieldErrors<T>;
} & React.ComponentPropsWithoutRef<typeof TextInput>;

const ControlledInput: <T extends FieldValues>(
  props: ControlledInputProps<T>
) => JSX.Element = ({ control, errors, name, placeholder, ...props }) => {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#667085"}
          autoCapitalize="none"
          {...props}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          className={twMerge(
            classNames(
              "w-full h-11 border text-base leading-5 rounded-lg px-4",
              errors[name] ? "border-red-500" : "border-permuta-edge"
            ),
            props.className
          )}
        />
      )}
      name={name}
    />
  );
};

export default ControlledInput;
