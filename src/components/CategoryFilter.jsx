import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";

export const CategoryFilter = ({ onFilterChange }) => {
  const { data } = useContext(DataContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data.categories && data.categories.length > 0) {
      setCategories(data.categories);
    }
  }, [data.categories]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    onFilterChange(value);
  };

  return (
    <>
      <label>Select Category: </label>
      <select onChange={handleChange} value={selectedCategory}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};
