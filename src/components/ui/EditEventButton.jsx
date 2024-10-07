import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useEditableControls,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

export const EditEventButton = ({
  defaultValues,
  onSave,
  onFail,
  eventId,
  categories,
}) => {
  const [localValues, setLocalValues] = useState({
    ...defaultValues,
    createdBy: defaultValues.createdBy,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCheckboxChange = (categoryId) => {
    const isSelected = localValues.categoryIds.includes(categoryId);
    setLocalValues({
      ...localValues,
      categoryIds: isSelected
        ? localValues.categoryIds.filter((id) => id !== categoryId)
        : [...localValues.categoryIds, categoryId],
    });
  };

  const handleSave = async () => {
    if (localValues.categoryIds.length === 0) {
      alert("Please select at least one category");
      return;
    }

    const updatedEvent = {
      ...localValues,
      startTime: new Date(localValues.startTime).toISOString(),
      endTime: new Date(localValues.endTime).toISOString(),
      createdBy: localValues.createdBy,
    };

    console.log("ending PUT request to update event: ", eventId);
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("error details:", errorText);
        throw new Error("Network response was not ok");
      }

      onSave(updatedEvent);
      console.log("Event has been succesfully updated");
      onClose();
    } catch (error) {
      console.error("Something went wrong:", error);
      onFail();
    }
  };

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : null;
  }

  return (
    <Box>
      <Box textAlign="center">
        <Stack direction="row" spacing="0.5rem">
          <Tooltip label="Edit event">
            <Button
              size={{ base: "md", md: "lg" }}
              leftIcon={<EditIcon />}
              colorScheme="teal"
              onClick={onOpen}
              aria-label="Edit Event"
              mx="1rem"
            >
              Edit event
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      {/* modal for editing eventdata */}
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xs", md: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#071c29">Edit Event</ModalHeader>
          <Tooltip label="close window">
            <ModalCloseButton />
          </Tooltip>
          <ModalBody>
            <Flex flexDir="column">
              <Stack spacing="1rem">
                {/* editable field for title */}
                <Editable
                  defaultValue={localValues.title}
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onChange={(value) =>
                    setLocalValues({ ...localValues, title: value })
                  }
                >
                  <Tooltip
                    label="Edit title"
                    shouldWrapChildren={true}
                    placement="right"
                  >
                    <EditablePreview
                      _hover={{ background: useColorModeValue("gray.300") }}
                      wordBreak="break-word"
                      border="1px"
                      borderStyle="solid"
                      borderColor="#071c29"
                      padding="0.5rem"
                    />
                  </Tooltip>
                  <EditableInput />
                  <EditableControls />
                </Editable>

                {/* editable field for image */}
                <Editable
                  defaultValue={localValues.image}
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onChange={(value) =>
                    setLocalValues({ ...localValues, image: value })
                  }
                >
                  <Tooltip label="Edit image" shouldWrapChildren={true}>
                    <EditablePreview
                      _hover={{ background: useColorModeValue("gray.300") }}
                      wordBreak="break-word"
                      border="1px"
                      borderStyle="solid"
                      borderColor="#071c29"
                      padding="0.5rem"
                    />
                  </Tooltip>
                  <EditableInput />
                  <EditableControls />
                </Editable>

                {/* editable field for categories */}
                <Tooltip label="Edit category" shouldWrapChildren={true}>
                  <CheckboxGroup>
                    {categories.map((category) => (
                      <Checkbox
                        key={category.id}
                        isChecked={localValues.categoryIds.includes(
                          category.id
                        )}
                        onChange={() => handleCheckboxChange(category.id)}
                      >
                        {category.name}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </Tooltip>

                {/* editable field for description */}
                <Editable
                  defaultValue={localValues.description}
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onChange={(value) =>
                    setLocalValues({ ...localValues, description: value })
                  }
                >
                  <Tooltip
                    label="Edit event description"
                    shouldWrapChildren={true}
                    placement="right"
                  >
                    <EditablePreview
                      _hover={{ background: useColorModeValue("gray.300") }}
                      wordBreak="break-word"
                      border="1px"
                      borderStyle="solid"
                      borderColor="#071c29"
                      padding="0.5rem"
                    />
                  </Tooltip>
                  <EditableInput />
                  <EditableControls />
                </Editable>

                {/* editable field for location */}
                <Editable
                  defaultValue={localValues.location}
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onChange={(value) =>
                    setLocalValues({ ...localValues, location: value })
                  }
                >
                  <Tooltip
                    label="Edit location"
                    shouldWrapChildren={true}
                    placement="right"
                  >
                    <EditablePreview
                      _hover={{ background: useColorModeValue("gray.300") }}
                      wordBreak="break-word"
                      border="1px"
                      borderStyle="solid"
                      borderColor="#071c29"
                      padding="0.5rem"
                    />
                  </Tooltip>
                  <EditableInput />
                  <EditableControls />
                </Editable>

                {/* editable field for startTime */}
                <Editable
                  defaultValue={localValues.startTime}
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onChange={(value) =>
                    setLocalValues({ ...localValues, startTime: value })
                  }
                >
                  <Tooltip
                    label="Edit startTime"
                    shouldWrapChildren={true}
                    placement="right"
                  >
                    <EditablePreview
                      _hover={{ background: useColorModeValue("gray.300") }}
                      wordBreak="break-word"
                      border="1px"
                      borderStyle="solid"
                      borderColor="#071c29"
                      padding="0.5rem"
                    />
                  </Tooltip>
                  <EditableInput type="datetime-local" />
                  <EditableControls />
                </Editable>

                {/* editable field for endTime */}
                <Editable
                  defaultValue={localValues.endTime}
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onChange={(value) =>
                    setLocalValues({ ...localValues, endTime: value })
                  }
                >
                  <Tooltip
                    label="Edit endTime"
                    shouldWrapChildren={true}
                    placement="right"
                  >
                    <EditablePreview
                      _hover={{ background: useColorModeValue("gray.300") }}
                      wordBreak="break-word"
                      border="1px"
                      borderStyle="solid"
                      borderColor="#071c29"
                      padding="0.5rem"
                    />
                  </Tooltip>
                  <EditableInput type="datetime-local" />
                  <EditableControls />
                </Editable>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Tooltip label="Save edit" placement="top">
              <Button
                onClick={handleSave}
                marginRight="0.5rem"
                colorScheme="teal"
              >
                Save
              </Button>
            </Tooltip>
            <Tooltip label="Cancel edit" placement="top">
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </Tooltip>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
