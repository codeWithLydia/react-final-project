import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { Flex, Tooltip } from "@chakra-ui/react";
import { TextInputSearch } from "../components/ui/TextInputSearch";

export const EventSearch = ({ setResults }) => {
  const { data } = useContext(DataContext);
  const [searchField, setSearchField] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchField(value);

    if (!data.events || data.events.length === 0) {
      setResults([]);
      return;
    }

    /* Filters events by title, compares the search field input with data */
    const matchedEvents = data.events.filter(({ title }) => {
      return title.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setResults(matchedEvents);
  };

  //Closes search results when searchfield gets cleared by user
  useEffect(() => {
    if (searchField === "") {
      setResults(data.events); //reset to all events when searchfield is cleared
    }
  }, [searchField, data.events, setResults]);

  return (
    <>
      <Flex className="search-field">
        <label htmlFor="event-search" className="label">
          Search for events
        </label>

        <Tooltip label="Search by using eventname" placement="bottom">
          <span>
            <TextInputSearch
              id="event-search"
              name="eventSearch"
              value={searchField}
              changeFn={handleChange}
              bg="#8b9499"
              w={{ base: 200, md: 300 }}
            />
          </span>
        </Tooltip>
      </Flex>
    </>
  );
};
