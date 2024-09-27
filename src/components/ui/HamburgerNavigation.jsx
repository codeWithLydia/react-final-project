import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const HamburgerNavigation = () => {
  return (
    <Menu>
      <MenuButton
        px={2.5}
        py={1.25}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        bg="#f0f0f0"
        _hover={{ bg: "#8b9499" }}
        _expanded={{ bg: "#ffc900" }}
        _focus={{ boxShadow: "outline" }}
      >
        <HamburgerIcon />
      </MenuButton>

      <MenuList>
        <MenuItem>
          <Link to="/" className="menu-link">
            Home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/eventspage" className="menu-link">
            Events
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/contact" className="menu-link">
            Contact us
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
