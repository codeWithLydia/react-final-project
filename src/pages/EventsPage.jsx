import React from "react";
import { useState, useContext } from "react";
import { Center, Box } from "@chakra-ui/react";
import { EventList } from "../components/EventList";
import { EventSearch } from "../components/EventSearch";
import { DataContext } from "../context/DataContext";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsPage = ({ setEvent, clickFn }) => {
  const { data } = useContext(DataContext);
  const [selectedEventList, setSelectedEventList] = useState(data.events);

  return (
    <Box>
      <Center flexDir="column" bgColor="#ffc900">
        <EventSearch setResults={setSelectedEventList} />
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
