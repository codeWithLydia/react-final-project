import React from "react";
import { Text, Flex } from "@chakra-ui/react";

export const Contact = () => {
  return (
    <Flex flexDir="column" bgColor="#fff89a" w="100vw" h="100vh">
      <Text>How to contact us?</Text>
      <Flex bgColor="#1a5f7a" flexDir="column" w="fit-content">
        <p>Email: </p>
        <p>jane.doe@janeseventlist.com</p>
        <p>Facebook: </p>
        <p>Jane&apos;s EventList</p>
        <p>Instgram: </p>
        <p>janeseventlist</p>
      </Flex>
    </Flex>
  );
};
