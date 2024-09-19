import React from "react";
import { useState } from "react";
import { Center } from "@chakra-ui/react";
import { EventList } from "../components/EventList";
import { EventSearch } from "../components/EventSearch";

export const EventsPage = ({ setEvent, clickFn }) => {
  const [selectedEventList, setSelectedEventList] = useState();

  return (
    <>
      <Center flexDir="column" bgColor="#ffc900">
        <EventSearch setResults={setSelectedEventList} />
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
    </>
  );
};
