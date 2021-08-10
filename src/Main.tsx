import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CountriesType, CountryType, getRandomCountries } from "../api";
import { Box, Text, useTheme } from "./components";

const Main = () => {
  const theme = useTheme();

  const [countriesStatus, setCountriesStatus] = useState("idle");
  const [mutalNeighbors, setMutalNeighbors] = useState<
    {
      origin: string;
      neighbor: string;
    }[]
  >([]);
  const [u, setU] = useState(0);

  const { data: randomCountries, status: randomCountriesStatus } =
    getRandomCountries();

  const getCountriesData = async () => {
    try {
      if (randomCountries) {
        setCountriesStatus("loading");
        randomCountries.map(async (country) => {
          setCountriesStatus("loading");
          const { data } = await axios.get<CountryType>(country.url);
          const neighborsArray: string[] = [];
          data.neighbors.map((n) => {
            neighborsArray.push(n.name);
            if (randomCountries.findIndex((e) => e.name === n.name) !== -1) {
              const tmpMutual = mutalNeighbors;
              if (
                tmpMutual.findIndex((e) => e.neighbor === data.names.name) ===
                -1
              ) {
                mutalNeighbors.push({
                  origin: data.names.name,
                  neighbor: n.name,
                });
                setMutalNeighbors(tmpMutual);
              }
            }
          });
          setU((prev) => prev + 1);
        });
        setCountriesStatus("success");
      }
    } catch (error) {
      setCountriesStatus("error");
      throw new Error(error);
    }
  };

  const renderRandomCountries = ({ item }: { item: CountriesType }) => (
    <Text variant="normalCaptionRegular" marginBottom="s">
      {item.name}
    </Text>
  );

  const renderNeighbors = ({
    item,
  }: {
    item: { origin: string; neighbor: string };
  }) => {
    const { origin, neighbor } = item;
    return (
      <Text variant="normalCaptionRegular">
        {origin} - {neighbor}
      </Text>
    );
  };

  const keyExtractor = (_item: any, index: number) => index.toString();

  useEffect(() => {
    getCountriesData();
  }, [randomCountriesStatus]);

  useEffect(() => {}, [u]);

  if (randomCountriesStatus === "loading")
    return (
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="large" color={theme.colors.blue} />
        <Text variant="largeTextBold" marginLeft="m">
          Loading
        </Text>
      </Box>
    );

  if (randomCountriesStatus === "error")
    return (
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text variant="largeTextBold" marginLeft="m">
          There is an error please try again.
        </Text>
      </Box>
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: theme.spacing.l,
        paddingHorizontal: theme.spacing.m,
      }}
    >
      <ScrollView>
        <Box>
          <Text variant="normalTextBold">Selected Countries</Text>
          <FlatList
            data={randomCountries}
            renderItem={renderRandomCountries}
            style={{ marginTop: theme.spacing.m }}
            {...{ keyExtractor }}
          />
        </Box>
        <Box marginTop="m">
          <Text variant="normalTextBold">Neighbors</Text>
          {countriesStatus === "loading" || countriesStatus === "idle" ? (
            <Box
              flex={1}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <ActivityIndicator size="large" color={theme.colors.blue} />
              <Text variant="largeTextBold" marginLeft="m">
                Loading
              </Text>
            </Box>
          ) : countriesStatus === "error" ? (
            <Box
              flex={1}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text variant="largeTextBold" marginLeft="m">
                There is an error please try again.
              </Text>
            </Box>
          ) : mutalNeighbors.length === 0 ? (
            <Box
              flex={1}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text variant="mediumTextBold" marginLeft="m">
                There is not any mutual neigbors.
              </Text>
            </Box>
          ) : (
            <FlatList
              data={mutalNeighbors}
              renderItem={renderNeighbors}
              style={{ marginTop: theme.spacing.m }}
              {...{ keyExtractor }}
            />
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
