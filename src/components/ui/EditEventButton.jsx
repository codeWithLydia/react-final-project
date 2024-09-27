import React, { useState } from "react";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  ButtonGroup,
  IconButton,
  Flex,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useEditableControls,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

export const EditEventButton = ({ defaultValues, onSave, onFail, eventId }) => {
  const [localValues, setLocalValues] = useState(defaultValues);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSave = async () => {
    console.log("ending PUT request to update event: ", eventId);
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localValues),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("error details:", errorText);
        throw new Error("Network response was not ok");
      }

      onSave(localValues);
      console.log("Event has been succesfully updated");
      onClose();
    } catch (error) {
      console.error("Something went wrong:", error);
      onFail();
    }
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Box>
      {/* Preview mode shows the content and the Edit button */}
      <Box textAlign="center">
        <IconButton
          size="md"
          icon={<EditIcon />}
          colorScheme="teal"
          onClick={onOpen}
          aria-label="Edit Event"
          mx="1rem"
        />
      </Box>

      {/* Modal for editing event */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="1.5rem"
            fontFamily="'Verdana', 'Tahoma', sans-serif"
            fontWeight="300"
            color="#071c29"
          >
            Edit Event
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              {/* Editable fields for title, description, startTime, and endTime */}
              <Editable
                textAlign="center"
                defaultValue={localValues.title}
                fontSize="1rem"
                fontFamily="'Verdana', 'Tahoma', sans-serif"
                color="#071c29"
                isPreviewFocusable={false}
                onChange={(value) =>
                  setLocalValues({ ...localValues, title: value })
                }
              >
                <EditablePreview />
                <EditableInput />
                <EditableControls />
              </Editable>

              <Editable
                textAlign="center"
                defaultValue={localValues.description}
                fontSize="1rem"
                fontFamily="'Verdana', 'Tahoma', sans-serif"
                color="#071c29"
                isPreviewFocusable={false}
                onChange={(value) =>
                  setLocalValues({ ...localValues, description: value })
                }
              >
                <EditablePreview />
                <EditableTextarea />
                <EditableControls />
              </Editable>

              <Editable
                textAlign="center"
                defaultValue={localValues.startTime}
                fontSize="1rem"
                fontFamily="'Verdana', 'Tahoma', sans-serif"
                color="#071c29"
                isPreviewFocusable={false}
                onChange={(value) =>
                  setLocalValues({ ...localValues, startTime: value })
                }
              >
                <EditablePreview />
                <EditableInput type="datetime-local" />
                <EditableControls />
              </Editable>

              <Editable
                textAlign="center"
                defaultValue={localValues.endTime}
                fontSize="1rem"
                fontFamily="'Verdana', 'Tahoma', sans-serif"
                color="#071c29"
                isPreviewFocusable={false}
                onChange={(value) =>
                  setLocalValues({ ...localValues, endTime: value })
                }
              >
                <EditablePreview />
                <EditableInput type="datetime-local" />
                <EditableControls />
              </Editable>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} monClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
