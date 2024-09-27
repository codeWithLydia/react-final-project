import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-link">
          <Button bgColor="#fff89a" margin="0.5rem">
            <Link to="/">Home</Link>
          </Button>
        </li>
        <li className="nav-link">
          <Button bgColor="#fff89a" margin="0.5rem">
            <Link to="/eventspage">Events</Link>
          </Button>
        </li>
        <li className="nav-link">
          <Button bgColor="#fff89a" margin="0.5rem">
            <Link to="/contact">Contact us</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
};
