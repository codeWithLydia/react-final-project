import {
  Box,
  CloseButton,
  Stack,
  Input,
  Checkbox,
  Button,
  Alert,
  AlertIcon,
  Tooltip,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";

export const EventSubmitForm = () => {
  const initialFormData = {
    createdBy: 1,
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { addEvent } = useContext(DataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setFormData({
        ...formData,
        categoryIds: [...formData.categoryIds, value],
      });
    } else {
      setFormData({
        ...formData,
        categoryIds: formData.categoryIds.filter((id) => id !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    /*when there is no category selected, user gets message to select a category */
    if (formData.categoryIds.length === 0) {
      setErrorMessage("You need to select a category for your event");
      setIsLoading(false);
      return;
    } else {
      setErrorMessage("");
    }

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the event");
      }

      const newEvent = await response.json(); //get new event from server
      addEvent(newEvent); //add event to context
      setFormData(initialFormData);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <Box className="add-event-page">
      <form onSubmit={handleSubmit} className="event-form">
        <Stack spacing={{ base: "1rem", md: "1.5rem" }}>
          {/* succes alert */}
          {showSuccess && (
            <Alert
              status="success"
              variant="solid"
              width="auto"
              mt={4}
              mb={4}
              padding="0.25rem"
              borderRadius="0.5rem"
            >
              <AlertIcon />
              Event has been succesfully added to the eventlist!
              <CloseButton
                position="absolute"
                right={-1}
                top={-1}
                onClick={() => setShowSuccess(false)}
              />
            </Alert>
          )}

          {/* error alert */}
          {errorMessage && (
            <Alert
              status="error"
              variant="solid"
              width="auto"
              mt={4}
              mb={4}
              padding="0.25rem"
              borderRadius="0.5rem"
            >
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          <Tooltip label="Event title" placement="bottom">
            <Input
              id="title"
              placeholder="Title Event"
              name="title"
              value={formData.title}
              onChange={handleChange}
              size={{ base: "md", md: "lg" }}
              borderColor="#071c29"
              bgColor="#f0f0f0"
              focusBorderColor="#071c29"
              _placeholder={{ opacity: 1, color: "#071c29" }}
              required
            />
          </Tooltip>

          <Tooltip label="Image URL" placement="bottom">
            <Input
              id="image"
              placeholder="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              size={{ base: "md", md: "lg" }}
              borderColor="#071c29"
              bgColor="#f0f0f0"
              focusBorderColor="#071c29"
              _placeholder={{ opacity: 1, color: "#071c29" }}
            />
          </Tooltip>

          <Stack spacing={3} direction="row">
            <Checkbox
              value="1"
              onChange={handleCategoryChange}
              id="category-sports"
              size={{ base: "md", md: "lg" }}
              borderColor="#071c29"
            >
              Sports
            </Checkbox>

            <Checkbox
              value="2"
              onChange={handleCategoryChange}
              id="category-games"
              size={{ base: "md", md: "lg" }}
              borderColor="#071c29"
            >
              Games
            </Checkbox>

            <Checkbox
              value="3"
              onChange={handleCategoryChange}
              id="category-relaxation"
              size={{ base: "md", md: "lg" }}
              borderColor="#071c29"
            >
              Relaxation
            </Checkbox>
          </Stack>

          <Tooltip label="Event description" placement="bottom">
            <Input
              id="description"
              placeholder="Desription Event"
              name="description"
              value={formData.description}
              onChange={handleChange}
              size={{ base: "md", md: "lg" }}
              borderColor="#071c29"
              bgColor="#f0f0f0"
              focusBorderColor="#071c29"
              _placeholder={{ opacity: 1, color: "#071c29" }}
              required
            />
          </Tooltip>

          <Tooltip label="Event location" placement="bottom">
            <Input
              id="location"
              placeholder="Location Event"
              name="location"
              value={formData.location}
              onChange={handleChange}
              size={{ base: "md", md: "lg" }}
              borderColor="#071c29"
              bgColor="#f0f0f0"
              focusBorderColor="#071c29"
              _placeholder={{ opacity: 1, color: "#071c29" }}
              required
            />
          </Tooltip>

          <Tooltip label="StartTime" placement="bottom">
            <Input
              id="startTime"
              placeholder="Select Start Time and Date"
              name="startTime"
              value={formData.startTime}
              type="datetime-local"
              onChange={handleChange}
              size={{ base: "md", md: "lg" }}
              borderColor="#071c29"
              bgColor="#f0f0f0"
              focusBorderColor="#071c29"
              _placeholder={{ opacity: 1, color: "#071c29" }}
              required
            />
          </Tooltip>

          <Tooltip label="EndTime" placement="bottom">
            <Input
              id="endTime"
              placeholder="Select End Time and Date"
              name="endTime"
              value={formData.endTime}
              type="datetime-local"
              onChange={handleChange}
              borderColor="#071c29"
              size={{ base: "md", md: "lg" }}
              bgColor="#f0f0f0"
              focusBorderColor="#071c29"
              _placeholder={{ opacity: 1, color: "#071c29" }}
              required
            />
          </Tooltip>
        </Stack>

        <Tooltip label="Submit event" placement="bottom">
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Submitting"
            size={{ base: "md", md: "lg" }}
            colorScheme="teal"
            marginTop={{ base: "0.5rem", md: "1rem" }}
          >
            Submit
          </Button>
        </Tooltip>
      </form>
    </Box>
  );
};
