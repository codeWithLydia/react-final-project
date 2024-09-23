import React, { useContext } from "react";
import { EventCard } from "./EventCard";
import { DataContext } from "../context/DataContext";

export const EventList = () => {
  const { data, loading, error } = useContext(DataContext);
  console.log(data);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>There seems to be a problem</p>;

  if (!data || !data.events || !data.categories) {
    return <p>No events or categories available</p>;
  }
  return (
    <>
      {data.events.map((event) => (
        <EventCard event={event} key={event.id} categories={data.categories} />
      ))}
    </>
  );
};
