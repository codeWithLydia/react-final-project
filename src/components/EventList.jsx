import React, { useContext } from "react";
import { EventCard } from "./EventCard";
import { DataContext } from "../Context/DataContext";

export const EventList = ({ events }) => {
  const { data, loading, error } = useContext(DataContext);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>There seems to be a problem</p>;

  if (!events || events.length === 0) {
    return <p>No events or categories available</p>;
  }

  return (
    <>
      {events.map((event) => (
        <EventCard event={event} key={event.id} categories={data.categories} />
      ))}
    </>
  );
};
