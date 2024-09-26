import React from "react";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Flex className="home-page">
      <Heading className="title">Welcome to Jane&apos;s EventList!</Heading>
      <Box className="welcome-text" bgColor="#1a5f7a">
        <Text>
          Vivamus. Odio bibendum pulvinar adipiscing posuere nostra mauris elit
          nibh gravida, facilisis morbi, euismod nisi Magnis vitae integer.
          Porttitor platea egestas. Et odio blandit ac pulvinar erat convallis
          curabitur netus.
        </Text>
      </Box>
    </Flex>
  );
};
