import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const CategoryFilter = ({ setResults, searchResults, onOpenModal }) => {
  const { data } = useContext(DataContext);

  const handleCategoryChange = (categoryId) => {
    const eventsToFilter =
      Array.isArray(searchResults) && searchResults.length > 0
        ? searchResults
        : data.events;

    console.log("events to filter:", eventsToFilter);
    console.log("selected category id:", categoryId);

    const filteredEvents = eventsToFilter.filter((event) => {
      if (categoryId === "") return true;
      return event.categoryIds.includes(parseInt(categoryId));
    });

    console.log("filtered events:", filteredEvents);
    setResults(filteredEvents);

    if (filteredEvents.length > 0) {
      onOpenModal();
    }
  };

  return (
    <>
      <label>Select Category: </label>
      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">All categories</option>
        {data.categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};
