import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Button colorScheme="yellow">
            <Link to="/">Home</Link>
          </Button>
        </li>
        <li>
          <Button colorScheme="yellow">
            <Link to="/eventspage">Events</Link>
          </Button>
        </li>
        <li>
          <Button colorScheme="yellow">
            <Link to="/contact">Contact us</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
};
