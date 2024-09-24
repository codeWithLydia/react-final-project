import React from "react";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({ eventId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the event");
      }

      onDelete();
    } catch (error) {
      console.error("Error deleting the event: ", error);
    }
  };

  return (
    <Button colorScheme="red" onClick={handleDelete}>
      Delete Event
    </Button>
  );
};
