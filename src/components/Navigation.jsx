import React from "react";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul className="nav-list">
        <Tooltip label="Home">
          <li>
            <Button
              size={{ base: "md", md: "lg" }}
              bgColor="#fff89a"
              margin="0.5rem"
            >
              <Link to="/">Home</Link>
            </Button>
          </li>
        </Tooltip>
        <Tooltip label="Eventspage">
          <li>
            <Button
              size={{ base: "md", md: "lg" }}
              bgColor="#fff89a"
              margin="0.5rem"
            >
              <Link to="/eventspage">Events</Link>
            </Button>
          </li>
        </Tooltip>
        <Tooltip label="Contact us">
          <li>
            <Button
              size={{ base: "md", md: "lg" }}
              bgColor="#fff89a"
              margin="0.5rem"
            >
              <Link to="/contact">Contact us</Link>
            </Button>
          </li>
        </Tooltip>
      </ul>
    </nav>
  );
};
