import { Box, Flex, Heading, Divider } from "@chakra-ui/react";
import React from "react";

export const ContactPage = () => {
  return (
    <Box className="contact-page">
      <Flex className="contact-text-box">
        <Heading className="page-title">How to contact us</Heading>
        <Flex className="contact-list">
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
    </Box>
  );
};
