import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { TextInputSearch } from "../components/ui/TextInputSearch";
import { SearchResultModal } from "./ui/SearchResultModal";

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
    console.log("matched events:", matchedEvents);
    console.log("searchfield:", value);
    console.log("resultlength", matchedEvents.length);

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
      <label>Search for events: </label>
      <TextInputSearch
        value={searchField}
        changeFn={handleChange}
        w={200}
        mb={8}
        bgColor="fff89a"
      />
      <SearchResultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        results={results}
      />
    </>
  );
};
