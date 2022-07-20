// This is a component that is implementing the search for the city from the list of cities
// We should be able to search for a city by providing the city's name
import React, { useState, useEffect } from "react";
import { cities } from "../public/cities";
import "./styles.css";

export default function App() {
  const [citiesList, setCitiesList] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [partial, partialSet] = useState();
  const [captitalCity, captialCitySet] = useState();

  const onSearch = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    // What if we want to check for partial string?
    // e.g. match value 'lon' against london
    const str = searchValue.toLowerCase();
    captialCitySet("london");
    partialSet("lon");

    const citiesNames = cities
      .map((city) => city)
      .filter((city) => {
        if (city.name.toLowerCase() === captitalCity && str === partial) {
          return true;
        } else {
          return city.name.toLowerCase() === str;
        }
      });

    setCitiesList(citiesNames);

    return citiesNames;
  }, [captitalCity, partial, searchValue]);

  return (
    <div className="App">
      <h2>Find your city</h2>
      <input onKeyUp={(element) => onSearch(element.target.value)} />
      {searchValue && (
        <button
          aria-label="Clear"
          type="submit"
          onMouseDown={() => setSearchValue("")}
        >
          clear
        </button>
      )}
      {citiesList?.map((city) => (
        <div>
          <div>{city.name}</div>
          <div>{city.country}</div>
        </div>
      ))}
    </div>
  );
}
