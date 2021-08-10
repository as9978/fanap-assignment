import axios from "axios";
import { useQuery } from "react-query";

import { getAllCountriesURL } from "../src/util/Constants";

type CountriesType = {
  name: string;
  url: string;
};

type CountryType = {
  names: {
    name: string;
  };
  neighbors: {
    id: string;
    name: string;
  };
};

export const getRandomCountries = () =>
  useQuery<Set<CountriesType>>("allCountries", async () => {
    try {
      const { data } = await axios.get<CountriesType[]>(getAllCountriesURL);

      const uniqeCountries = new Set<CountriesType>();

      while (uniqeCountries.size !== 10) {
        const randomIndex = Math.ceil(Math.random() * data.length);
        uniqeCountries.add(data[randomIndex]);
      }

      return uniqeCountries;
    } catch (error) {
      throw new Error(error);
    }
  });

export const getCountries = (countries: Set<CountriesType> | undefined) =>
  useQuery<CountriesType[]>(
    "country",
    async () => {
      try {
        const response: CountriesType[] = [];
        if (countries)
          countries.forEach(async (country) => {
            const { data } = await axios.get<CountriesType>(country.url);
            response.push(data);
          });

        return response;
      } catch (error) {
        throw new Error(error);
      }
    },
    {
      enabled: countries && countries.size === 10,
    }
  );
