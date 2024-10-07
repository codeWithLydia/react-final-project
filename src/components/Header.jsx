import React from "react";
import { Flex, Heading, Show } from "@chakra-ui/react";
import { Navigation } from "./Navigation";
import { HamburgerNavigation } from "./HamburgerNavigation";

export const Header = () => {
  return (
    <Flex className="header">
      <Heading className="logo">Jane&apos;s EventList</Heading>
      <Show below="md">
        <HamburgerNavigation />
      </Show>
      <Show above="md">
        <Navigation />
      </Show>
    </Flex>
  );
};
