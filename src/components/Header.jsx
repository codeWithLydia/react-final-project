import React from "react";
import { Flex, Text, Show } from "@chakra-ui/react";
import { Navigation } from "./Navigation";
import { HamburgerNavigation } from "./ui/HamburgerNavigation";

export const Header = () => {
  return (
    <Flex className="header">
      <Text className="header-text">Jane&apos;s EventList</Text>
      <Show below="md">
        <HamburgerNavigation />
      </Show>
      <Show above="md">
        <Navigation />
      </Show>
    </Flex>
  );
};
