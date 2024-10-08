import React, { useContext } from "react";
import {
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { DataContext } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";

export const DeleteButton = ({ eventId, eventName }) => {
  const { deleteEvent } = useContext(DataContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the event");
      }

      deleteEvent(eventId);

      //navigate to the EventsPage and pass a successmessage as state
      navigate("/eventsPage", {
        state: { message: "Event has been successfully deleted" },
      });
    } catch (error) {
      console.error("Error deleting the event: ", error);
    }
  };

  return (
    <>
      <Tooltip label="Delete event">
        <Button
          size={{ base: "md", md: "lg" }}
          colorScheme="red"
          onClick={onOpen}
        >
          Delete Event
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete {eventName}?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr="0.5rem" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
