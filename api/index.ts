import axios from "axios";
import { useQuery } from "react-query";

import { getAllCountriesURL } from "../src/util/Constants";

export type CountriesType = {
  name: string;
  url: string;
};

export type CountryType = {
  names: {
    name: string;
  };
  neighbors: {
    id: string;
    name: string;
  }[];
};

export const getRandomCountries = () =>
  useQuery<CountriesType[]>("allCountries", async () => {
    try {
      const { data } = await axios.get<CountriesType[]>(getAllCountriesURL);

      const uniqeCountries = new Set<CountriesType>();

      while (uniqeCountries.size !== 10) {
        const randomIndex = Math.ceil(Math.random() * data.length);
        uniqeCountries.add(data[randomIndex]);
      }

      return [...uniqeCountries];
    } catch (error) {
      throw new Error(error);
    }
  });
