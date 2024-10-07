import React, { useState, useContext, useEffect } from "react";
import {
  Center,
  Box,
  Stack,
  Flex,
  Button,
  Tooltip,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { EventList } from "../components/EventList";
import { EventSearch } from "../components/EventSearch";
import { DataContext } from "../Context/DataContext";
import { Link, useLocation } from "react-router-dom";
import { CategoryFilter } from "../components/CategoryFilter";

export const EventsPage = ({ setEvent, clickFn }) => {
  const { data } = useContext(DataContext);
  const [selectedEventList, setSelectedEventList] = useState(data.events);
  const location = useLocation(); //get location
  const [showSuccess, setShowSuccess] = useState(false);

  //check to see if there is a message in the navigationstate
  useEffect(() => {
    if (location.state?.message) {
      setShowSuccess(true); //show alert when there is a message
      const timer = setTimeout(() => {
        setShowSuccess(false); // hide alert after 5 sec
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <Box className="events-page">
      <Flex flexDir="column" alignItems="center">
        <Stack mt="3" mb="3" spacing="2">
          <EventSearch
            setResults={setSelectedEventList}
            id="event-search"
            name="eventSearch"
          />

          <CategoryFilter
            setResults={setSelectedEventList}
            id="category-filter"
            name="category"
          />
        </Stack>
        <Tooltip label="Add event" placement="right">
          <Button size={{ base: "md", md: "lg" }} colorScheme="teal">
            <Link to="/submitform">Add event</Link>
          </Button>
        </Tooltip>
      </Flex>

      {/* success alert after deleting event*/}
      {showSuccess && (
        <Alert
          status="success"
          variant="solid"
          width="auto"
          mt={4}
          mb={4}
          padding="0.25rem"
          borderRadius="0.5rem"
        >
          <AlertIcon />
          {location.state.message}
          <CloseButton
            position="absolute"
            right={-1}
            top={-1}
            onClick={() => setShowSuccess(false)}
          />
        </Alert>
      )}
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
