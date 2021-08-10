import "react-native-gesture-handler";
import React from "react";
import { I18nManager } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { LoadAssets } from "./src/components";
import { theme } from "./src/components/Theme";
import Main from "./src/Main";

I18nManager.allowRTL(false);

const fonts = {
  "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
};

const client = new QueryClient();

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts }}>
        <QueryClientProvider {...{ client }}>
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
        </QueryClientProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}
