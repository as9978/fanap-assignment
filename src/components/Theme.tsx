import { TextStyle, ViewStyle, ImageStyle } from "react-native";
import {
  createText,
  createBox,
  useTheme as useReTheme,
  createTheme,
} from "@shopify/restyle";

const regular = "Poppins-Regular";
const bold = "Poppins-Bold";

export const theme = createTheme({
  breakpoints: {},
  colors: {
    black: "black",
    white: "white",
    blue: "#2980B9",
    red: "#c0392b",
    grey: "#7f8c8d",
    green: "#27ae60",
    orange: "#e67e22",
    transparent: "transparent",
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadii: {
    none: 0,
    xs: 5,
    s: 10,
    m: 15,
    l: 20,
    xl: 100,
  },
  textVariants: {
    heading1: {
      fontFamily: bold,
      fontSize: 40,
      spacing: 0.5,
      color: "black",
    },
    heading2: {
      fontFamily: bold,
      fontSize: 32,
      spacing: 0.5,
      color: "black",
    },
    heading3: {
      fontFamily: bold,
      fontSize: 27,
      spacing: 0.5,
      color: "black",
    },
    heading4: {
      fontFamily: bold,
      fontSize: 24,
      spacing: 0.5,
      color: "black",
    },
    heading5: {
      fontFamily: bold,
      fontSize: 22,
      spacing: 0.5,
      color: "black",
    },
    heading6: {
      fontFamily: bold,
      fontSize: 18,
      spacing: 0.5,
      color: "black",
    },
    largeTextBold: {
      fontFamily: bold,
      fontSize: 24,
      spacing: 0.5,
      color: "black",
    },
    largeTextRegular: {
      fontFamily: regular,
      fontSize: 24,
      spacing: 0.5,
      color: "black",
    },
    mediumTextBold: {
      fontFamily: bold,
      fontSize: 22,
      spacing: 0.5,
      color: "black",
    },
    mediumTextRegular: {
      fontFamily: regular,
      fontSize: 22,
      spacing: 0.5,
      color: "black",
    },
    normalTextBold: {
      fontFamily: bold,
      fontSize: 20,
      spacing: 0.5,
      color: "black",
    },
    normalTextRegular: {
      fontFamily: regular,
      fontSize: 20,
      spacing: 0.5,
      color: "black",
    },
    largeCaptionBold: {
      fontFamily: bold,
      fontSize: 20,
      spacing: 0.5,
      color: "black",
    },
    largeCaptionRegular: {
      fontFamily: regular,
      fontSize: 20,
      spacing: 0.5,
      color: "black",
    },
    normalCaptionBold: {
      fontFamily: bold,
      fontSize: 18,
      spacing: 0.5,
      color: "black",
    },
    normalCaptionRegular: {
      fontFamily: regular,
      fontSize: 18,
      spacing: 0.5,
      color: "black",
    },
    largeLinkBold: {
      fontFamily: bold,
      fontSize: 22,
      spacing: 0.5,
      color: "black",
    },
    largeLinkRegular: {
      fontFamily: regular,
      fontSize: 22,
      spacing: 0.5,
      color: "black",
    },
  },
});

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
