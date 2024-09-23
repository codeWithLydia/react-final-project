import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const CategoryFilter = ({ setResults }) => {
  const { data } = useContext(DataContext);

  const handleCategoryChange = (categoryId) => {
    const filteredEvents = data.events.filter((event) =>
      event.categoryIds.includes(parseInt(categoryId))
    );
    setResults(filteredEvents);
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
