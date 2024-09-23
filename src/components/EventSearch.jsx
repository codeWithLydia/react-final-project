import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { TextInputSearch } from "../components/ui/TextInputSearch";

export const EventSearch = ({ setResults }) => {
  const { data } = useContext(DataContext);
  const [searchField, setSearchField] = useState("");

  const handleChange = (event) => {
    setSearchField(event.target.value);

    const matchedEvents = data.events.filter(({ title }) => {
      return title.toLowerCase().includes(event.target.value.toLowerCase());
    });
    console.log("matched events:", matchedEvents);

    setResults(matchedEvents);
  };

  return (
    <>
      <label>Search for events: </label>
      <TextInputSearch
        value={searchField}
        changeFn={handleChange}
        w={200}
        mb={8}
        bgColor="fff89a"
      />
    </>
  );
};
