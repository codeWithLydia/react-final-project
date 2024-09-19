import React from "react";
import { Flex, Text, Show } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <Flex bgColor="blue.300" justifyContent="space-between">
      <Text>Jane's EventList</Text>
      <Show below="md">
        <HamburgerIcon />
      </Show>
      <Show above="md">
        <Navigation />
      </Show>
    </Flex>
  );
};
