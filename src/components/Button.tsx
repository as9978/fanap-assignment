import React, { memo } from "react";
import {
  StyleProp,
  ViewStyle,
  ButtonProps as RNButtonProps,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { IconName } from "./index";
import { Box, Text, Theme, useTheme } from "./Theme";

export interface ButtonProps extends RNButtonProps {
  title: string;
  variant?: "primary" | "transparent" | "bordered";
  containerProps?: StyleProp<ViewStyle>;
  icon?: {
    name: IconName;
    color: keyof Theme["colors"];
    size: number;
    position: "left" | "right";
    style?: StyleProp<ViewStyle>;
  };
  textColorProp?: keyof Theme["colors"];
  textVariant?: keyof Theme["textVariants"];
  isLoading?: boolean;
  onPress: () => void;
}

const Button = memo(
  ({
    variant,
    title,
    containerProps,
    textColorProp,
    icon,
    textVariant,
    isLoading,
    onPress,
    ...props
  }: ButtonProps) => {
    const theme = useTheme();

    const backgroundColor =
      variant === "transparent" || variant === "bordered"
        ? "transparent"
        : "blue";

    return (
      <TouchableOpacity {...props} {...{ onPress }}>
        <Box
          alignItems="center"
          paddingVertical="s"
          paddingHorizontal="m"
          borderRadius="xs"
          flexDirection={icon || isLoading ? "row" : undefined}
          {...{ backgroundColor }}
          {...containerProps}
          borderWidth={variant === "bordered" ? 1 : undefined}
          borderColor={textColorProp ? textColorProp : "white"}
        >
          {isLoading && (
            <ActivityIndicator
              color={textColorProp ? textColorProp : "white"}
              size="small"
              style={{ marginRight: theme.spacing.s }}
            />
          )}
          {icon?.position === "left" && !isLoading && (
            <Icon
              name={icon.name}
              color={icon.color}
              size={icon.size}
              style={[{ marginRight: theme.spacing.s }, icon.style]}
            />
          )}
          <Text
            variant={textVariant ? textVariant : "largeTextBold"}
            color={textColorProp ? textColorProp : "white"}
          >
            {title}
          </Text>
          {icon?.position === "right" && !isLoading && (
            <Icon
              name={icon.name}
              color={icon.color}
              size={icon.size}
              style={[{ marginLeft: theme.spacing.s }, icon.style]}
            />
          )}
        </Box>
      </TouchableOpacity>
    );
  }
);

export default Button;
