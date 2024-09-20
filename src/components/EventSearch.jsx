import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { TextInputSearch } from "../components/ui/TextInputSearch";
import { Link } from "react-router-dom";

export const EventSearch = () => {
  const { data } = useContext(DataContext);
  const [searchField, setSearchField] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchField(searchValue);

    if (searchValue === "") {
      setResults([]);
    } else {
      const matchedEvents = data.events.filter(({ title }) => {
        return title.toLowerCase().includes(searchValue);
      });

      setResults(matchedEvents);
    }
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
      <ul>
        {results.map((event) => (
          <li key={event.id}>
            <Link to={`/event/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
