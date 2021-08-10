import React, {
  Dispatch,
  forwardRef,
  Fragment,
  memo,
  SetStateAction,
} from "react";
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { Box, useTheme, Theme, Text } from "./Theme";
import { IconName } from "./index";
import RoundedIconButton from "./RoundedIconButton";
// import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

interface TextInputProps extends RNTextInputProps {
  title?: string;
  rightIcon?: IconName;
  leftIcon?: IconName;
  touched?: boolean;
  error?: string;
  iconColor?: keyof Theme["colors"];
  inputColor?: keyof Theme["colors"];
  inputFont?: string;
  inputFontSize?: number;
  isSearch?: boolean;
  dontPadding?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  selectedCode?: { flag: string; code: string };
  setSelecteCode?: Dispatch<SetStateAction<{ flag: string; code: string }>>;
  leftIconButton?: {
    name: IconName;
    size?: number;
    onPress: () => void;
  };
  rightIconButton?: {
    name: IconName;
    size?: number;
    onPress: () => void;
  };
}

const TextInput = memo(
  forwardRef<RNTextInput, TextInputProps>(
    (
      {
        title,
        rightIcon,
        rightIconButton,
        leftIcon,
        leftIconButton,
        touched,
        error,
        iconColor,
        inputFont,
        inputColor,
        inputFontSize,
        isSearch,
        dontPadding,
        containerStyle,
        selectedCode,
        setSelecteCode,
        ...props
      },
      ref
    ) => {
      const theme = useTheme();

      const color = !touched ? "grey" : error ? "red" : "blue";
      const iColor = theme.colors[color];

      return (
        <Fragment>
          <Box
            flexDirection="row"
            alignItems="center"
            width="100%"
            padding={dontPadding ? undefined : "s"}
            borderWidth={1}
            borderColor={color}
            borderRadius={isSearch ? "xl" : "s"}
            {...containerStyle}
          >
            {title && (
              <Box
                position="absolute"
                top={-15}
                left={5}
                backgroundColor="white"
                paddingHorizontal="s"
              >
                <Text variant="mediumTextBold" color="blue">
                  {title}
                </Text>
              </Box>
            )}
            {leftIcon && (
              <Icon
                name={leftIcon}
                size={20}
                style={{
                  marginLeft: theme.borderRadii.m,
                  marginRight: theme.borderRadii.s,
                }}
                color={iconColor ? theme.colors[iconColor] : iColor}
              />
            )}
            {leftIconButton && (
              <Box marginLeft="m" marginRight="m">
                <RoundedIconButton
                  name={leftIconButton.name}
                  size={leftIconButton.size ? leftIconButton.size : 20}
                  iconRatio={1}
                  backgroundColor="transparent"
                  color={iconColor ? iconColor : color}
                  onPress={leftIconButton.onPress}
                />
              </Box>
            )}
            <RNTextInput
              ref={ref}
              placeholderTextColor={theme.colors[color]}
              underlineColorAndroid="transparent"
              style={{
                fontFamily: inputFont ? inputFont : "Poppins-Regular",
                color: inputColor ? inputColor : "black",
                fontSize: inputFontSize ? inputFontSize : 20,
                flex: 1,
              }}
              {...props}
            />
            {rightIcon && (
              <Icon
                name={rightIcon}
                style={{
                  marginLeft: theme.borderRadii.m,
                  marginRight: theme.borderRadii.s,
                }}
                size={20}
                color={iconColor ? theme.colors[iconColor] : iColor}
              />
            )}
            {rightIconButton && (
              <Box marginLeft="m" marginRight="s">
                <RoundedIconButton
                  name={rightIconButton.name}
                  size={rightIconButton.size ? rightIconButton.size : 12}
                  iconRatio={1}
                  backgroundColor="transparent"
                  color={iconColor ? iconColor : color}
                  onPress={rightIconButton.onPress}
                />
              </Box>
            )}
          </Box>
        </Fragment>
      );
    }
  )
);

export default TextInput;
