import React from "react";
import { Text, Flex, Divider } from "@chakra-ui/react";

export const Contact = () => {
  return (
    <Flex className="contact-page">
      <Text className="title">How to contact us?</Text>
      <Flex className="contact-info">
        <p>Email: </p>
        <p>jane.doe@janeseventlist.com</p>
        <Divider />
        <p>Facebook: </p>
        <p>Jane&apos;s EventList</p>
        <Divider />
        <p>Instgram: </p>
        <p>janeseventlist</p>
      </Flex>
    </Flex>
  );
};
