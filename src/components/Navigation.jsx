import React from "react";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul className="nav-list">
        <Tooltip label="Home">
          <li>
            <Link to="/">
              <Button
                size={{ base: "md", md: "lg" }}
                bgColor="#fff89a"
                margin="0.5rem"
              >
                Home
              </Button>
            </Link>
          </li>
        </Tooltip>
        <Tooltip label="Eventspage">
          <li>
            <Link to="/eventsPage">
              <Button
                size={{ base: "md", md: "lg" }}
                bgColor="#fff89a"
                margin="0.5rem"
              >
                Events
              </Button>
            </Link>
          </li>
        </Tooltip>
        <Tooltip label="Contact us">
          <li>
            <Link to="/contact">
              <Button
                size={{ base: "md", md: "lg" }}
                bgColor="#fff89a"
                margin="0.5rem"
              >
                Contact
              </Button>
            </Link>
          </li>
        </Tooltip>
      </ul>
    </nav>
  );
};
