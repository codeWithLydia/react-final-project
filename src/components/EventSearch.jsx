import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { TextInputSearch } from "../components/ui/TextInputSearch";
import { SearchResultModal } from "./ui/SearchResultModal";
import { Flex } from "@chakra-ui/react";

export const EventSearch = ({ setResults }) => {
  const { data } = useContext(DataContext);
  const [searchField, setSearchField] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setSearchResults] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchField(value);

    if (!data.events || data.events.length === 0) {
      setSearchResults([]);
      setResults([]);
      setIsModalOpen(false);
      return;
    }

    const matchedEvents = data.events.filter(({ title }) => {
      return title.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setSearchResults(matchedEvents);
    setResults(matchedEvents);

    if (matchedEvents.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchResults([]);
    setSearchField("");
  };

  useEffect(() => {
    if (searchField === "") {
      setIsModalOpen(false);
    }
  }, [searchField]);

  return (
    <>
      <Flex flexDir="row" alignItems="center">
        <label className="search-label">Search for events: </label>
        <TextInputSearch
          value={searchField}
          changeFn={handleChange}
          w={250}
          m="0.5rem"
        />
      </Flex>
      <SearchResultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        results={results}
      />
    </>
  );
};
