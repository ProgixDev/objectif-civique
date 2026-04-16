import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Radius } from "@/constants/radius";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
};

export const Input = forwardRef<TextInput, Props>(function Input(
  { label, error, leftIcon, rightIcon, containerStyle, onFocus, onBlur, style, ...rest },
  ref
) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? Colors.error
    : focused
      ? Colors.primary
      : Colors.outlineVariant;

  return (
    <View style={containerStyle}>
      {label ? (
        <Text style={[Typography.caption, styles.label]}>{label}</Text>
      ) : null}
      <View style={[styles.inputWrapper, { borderColor }]}>
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
        <TextInput
          ref={ref}
          placeholderTextColor={Colors.textTertiary}
          style={[
            Typography.bodyLarge,
            styles.input,
            {
              color: Colors.onSurface,
              paddingLeft: leftIcon ? 44 : 18,
              paddingRight: rightIcon ? 44 : 18,
            },
            style,
          ]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
      </View>
      {error ? (
        <Text style={[Typography.caption, styles.error]}>{error}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  inputWrapper: {
    height: 46,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    backgroundColor: Colors.surfaceContainerLowest,
    justifyContent: "center",
  },
  input: {
    height: 46,
  },
  leftIcon: {
    position: "absolute",
    left: 18,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: "100%",
  },
  error: {
    color: Colors.error,
    marginTop: 4,
    marginLeft: 8,
  },
});
