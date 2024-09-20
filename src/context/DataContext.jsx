import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ categories: [], events: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsResponse, usersResponse, categoriesResponse] =
        await Promise.all([
          fetch("http://localhost:3000/events"),
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/categories"),
        ]);
      console.log("events response status:", eventsResponse.status);
      console.log("users response status:", usersResponse.status);
      console.log("categories response status", categoriesResponse.status);

      if (!eventsResponse.ok || !usersResponse.ok || !categoriesResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const [events, users, categories] = await Promise.all([
        eventsResponse.json(),
        usersResponse.json(),
        categoriesResponse.json(),
      ]);
      console.log({ events, users, categories });

      setData({ events, users, categories });
    } catch (err) {
      console.log("error occured:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
