import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

export const FailMessage = ({
  message,
  showFail,
  setShowFail,
  duration = 5000,
}) => {
  useEffect(() => {
    if (showFail) {
      const timer = setTimeout(() => {
        setShowFail(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [showFail, setShowFail, duration]);

  return (
    <>
      {showFail && (
        <Box
          bg="red.500"
          color="white"
          p={4}
          borderRadius="md"
          textAlign="center"
        >
          <Text>{message}</Text>
        </Box>
      )}
    </>
  );
};
