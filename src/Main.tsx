import React from "react";
import { getCountries, getRandomCountries } from "../api";
import { Box, Text } from "./components";

const Main = () => {
  const { data: randomCountries, status: randomCountriesStatus } =
    getRandomCountries();

  const { data: countries, status: countriesStatus } =
    getCountries(randomCountries);

  console.log("randomCountries");
  console.log(randomCountries);

  console.log("countries");
  console.log(countries);

  return (
    <Box>
      <Text>Main</Text>
    </Box>
  );
};

export default Main;
