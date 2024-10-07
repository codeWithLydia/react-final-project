import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const HomePage = () => {
  return (
    <Box className="home-page">
      <Flex className="home-text-box">
        <Heading className="page-title">
          Welcome to Jane&apos;s EventList!
        </Heading>
        <Text className="page-text">
          The website where you can find all kinds of activities. From a
          relaxing yogalesson to an active bike ride through Ansterdam, you can
          find it here. Have fun with family and friends, enjoy each others
          company and also get to know other like-minded people. Discover places
          you&apos;ve never been. Enjoy!!
        </Text>
      </Flex>
    </Box>
  );
};
