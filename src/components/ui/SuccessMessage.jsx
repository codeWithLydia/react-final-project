import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

export const SuccessMessage = ({
  message,
  showSuccess,
  setShowSuccess,
  duration = 5000,
}) => {
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, setShowSuccess, duration]);

  return (
    <>
      {showSuccess && (
        <Box
          bg="green.500"
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
