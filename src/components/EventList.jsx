import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { EventCard } from "./EventCard";

export const EventList = () => {
  const { data, loading, error } = useContext(DataContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There seems to be a problem with the data</p>;

  const categoriesMap = new Map(
    data.categories.map((category) => [category.id, category])
  );

  const eventsWithCategories = data.events.map((event) => ({
    ...event,
    categories: event.categoryIds.map((id) => categoriesMap.get(id)),
  }));

  return (
    <>
      {eventsWithCategories.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </>
  );
};
