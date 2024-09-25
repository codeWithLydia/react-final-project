import React from "react";
import { useState, useContext } from "react";
import { Center, Box } from "@chakra-ui/react";
import { EventList } from "../components/EventList";
import { EventSearch } from "../components/EventSearch";
import { DataContext } from "../context/DataContext";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CategoryFilter } from "../components/CategoryFilter";
import { SearchResultModal } from "../components/ui/SearchResultModal";

export const EventsPage = ({ setEvent, clickFn }) => {
  const { data } = useContext(DataContext);
  const [selectedEventList, setSelectedEventList] = useState(data.events);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalResults, setModalResults] = useState([]);

  const handleModalIsOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Center flexDir="column" bgColor="#ffc900">
        <EventSearch setResults={setSelectedEventList} />
        <CategoryFilter
          setResults={(results) => {
            setSelectedEventList(results);
            setModalResults(results);
            if (results.length > 0) handleModalIsOpen();
          }}
          searchResults={selectedEventList}
          onOpenModal={handleModalIsOpen}
        />
        <SearchResultModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          results={modalResults}
        />
        <Button>
          <Link to="/submitform">Add event</Link>
        </Button>
        <Center
          flexDir={{ base: "column", md: "row" }}
          flexWrap={{ md: "wrap" }}
          bgColor="#fff89a"
          mt="1"
        >
          <EventList
            clickFn={clickFn}
            setEvent={setEvent}
            events={selectedEventList}
          />
        </Center>
      </Center>
    </Box>
  );
};
