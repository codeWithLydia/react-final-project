import React from "react";
import { useState, useContext, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import { EventList } from "../components/EventList";
import { EventSearch } from "../components/EventSearch";
import { CategoryFilter } from "../components/CategoryFilter";
import { DataContext } from "../context/DataContext";
import { Button } from "../components/ui/Button";

export const EventsPage = ({ setEvent, clickFn }) => {
  const { data } = useContext(DataContext);
  const [selectedEventList, setSelectedEventList] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    let filteredEvents = data.events;

    if (searchTerm) {
      filteredEvents = filteredEvents.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (selectedCategory) {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === selectedCategory
      );
    }

    setSelectedEventList(filteredEvents);
  }, [data.events, searchTerm, selectedCategory]);

  return (
    <>
      <Center flexDir="column" bgColor="#ffc900">
        <Button>Add Event</Button>
        <EventSearch setResults={setSearchTerm} />
        <CategoryFilter onFilterChange={setSelectedCategory} />
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
