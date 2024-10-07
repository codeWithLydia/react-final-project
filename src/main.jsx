import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { EventSubmitForm } from "./pages/EventSubmitForm";
import { DataProvider } from "./Context/DataContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        // loader: postListLoader, Used DataContext instead
      },
      {
        path: "/eventsPage",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/submitform",
        element: <EventSubmitForm />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </ChakraProvider>
  </React.StrictMode>
);
