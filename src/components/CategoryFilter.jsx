import React, { useContext } from "react";
import { DataContext } from "../Context/DataContext";
import { Box, Select, Tooltip } from "@chakra-ui/react";

export const CategoryFilter = ({ setResults, id, name }) => {
  const { data } = useContext(DataContext);

  const handleCategoryChange = (categoryId) => {
    const eventsToFilter = data.events;

    const filteredEvents = eventsToFilter.filter((event) => {
      if (categoryId === "") return true; //show all events when no category is selected
      return event.categoryIds.includes(parseInt(categoryId));
    });

    setResults(filteredEvents); // updates the results in parentcomponent
  };

  return (
    <Box className="category-filter">
      <label htmlFor={id} className="label">
        Select category
      </label>
      <Tooltip label="Filter by category" placement="bottom">
        <span>
          <Select
            bg="#8b9499"
            size="md"
            id={id}
            name={name}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All categories</option>
            {data.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </span>
      </Tooltip>
    </Box>
  );
};
