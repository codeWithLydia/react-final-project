import React from "react";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Flex className="home-page">
      <Heading className="title">Welcome to Jane&apos;s EventList!</Heading>
      <Box className="welcome-text">
        <Text>
          The website where you can find all kinds of activities. From a
          relaxing yogalesson to a active bike ride through Ansterdam, you can
          find it here. Have fun with family and friends, enjoy each others
          company and also get to know other like-minded people. Discover places
          you&apos;ve never been. Enjoy!!
        </Text>
      </Box>
    </Flex>
  );
};
