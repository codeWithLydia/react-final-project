import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ categories: [], events: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetches the initial data for events, users and categories
  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsResponse, usersResponse, categoriesResponse] =
        await Promise.all([
          fetch("http://localhost:3000/events"),
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/categories"),
        ]);

      if (!eventsResponse.ok || !usersResponse.ok || !categoriesResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const [events, users, categories] = await Promise.all([
        eventsResponse.json(),
        usersResponse.json(),
        categoriesResponse.json(),
      ]);

      setData({ events, users, categories });
    } catch (err) {
      console.log("error occurred:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  //Handle delete event action in the eventpage
  const deleteEvent = (eventId) => {
    setData((prevData) => ({
      ...prevData,
      events: prevData.events.filter((event) => event.id !== eventId),
    }));
  };

  //Handle add event action in the eventsubmitform
  const addEvent = (newEvent) => {
    setData((prevData) => ({
      ...prevData,
      events: [...prevData.events, newEvent],
    }));
  };

  //Handle edit event action in eventpage
  const updateEvent = (eventId, updatedEvent) => {
    setData((prevData) => ({
      ...prevData,
      events: prevData.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ data, loading, error, deleteEvent, addEvent, updateEvent }}
    >
      {children}
    </DataContext.Provider>
  );
};
