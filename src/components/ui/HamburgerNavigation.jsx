import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const HamburgerNavigation = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/eventspage">Events</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/contact">Contact us</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
