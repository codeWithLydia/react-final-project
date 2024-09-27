import React, { useState, useContext } from "react";
import { Center, Box, Stack, Flex, Button } from "@chakra-ui/react";
import { EventList } from "../components/EventList";
import { EventSearch } from "../components/EventSearch";
import { DataContext } from "../context/DataContext";
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
    <Box className="events-page">
      <Flex flexDir="column" alignItems="center">
        <Stack mt="3" mb="3" spacing="2">
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
        </Stack>
        <Button colorScheme="teal" mt="2rem">
          <Link to="/submitform">Add event</Link>
        </Button>
      </Flex>
      <Center
        flexDir={{ base: "column", md: "row" }}
        flexWrap={{ md: "wrap" }}
        mt="1rem"
        mb="1rem"
      >
        <EventList
          clickFn={clickFn}
          setEvent={setEvent}
          events={selectedEventList}
        />
      </Center>
    </Box>
  );
};
