import {
  Stack,
  Input,
  Checkbox,
  Button,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

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

    if (formData.categoryIds.length === 0) {
      setErrorMessage("You need to pick a category for your event");
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

      const newEvent = await response.json();
      console.log("Event created succesfully: ", newEvent);
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
    <Flex bgColor="yellow.100" width="100vw" height="100vh">
      <form className="add-event-form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Success Alert */}
          {showSuccess && (
            <Alert status="success" variant="solid">
              <AlertIcon />
              Event has been succesfully added to our list!
            </Alert>
          )}

          {/* Error Alert */}
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <Input
            placeholder="Title Event"
            name="title"
            value={formData.title}
            onChange={handleChange}
            size="md"
            bgColor="#f0f0f0"
            focusBorderColor="#071c29"
            _placeholder={{ opacity: 1, color: "#071c29" }}
            required
          />
          <Input
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            size="md"
            bgColor="#f0f0f0"
            focusBorderColor="#071c29"
            _placeholder={{ opacity: 1, color: "#071c29" }}
          />
          <Stack spacing={3} direction="row">
            <Checkbox value="1" onChange={handleCategoryChange}>
              Sports
            </Checkbox>
            <Checkbox value="2" onChange={handleCategoryChange}>
              Games
            </Checkbox>
            <Checkbox value="3" onChange={handleCategoryChange}>
              Relaxation
            </Checkbox>
          </Stack>
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          <Input
            placeholder="Desription Event"
            name="description"
            value={formData.description}
            onChange={handleChange}
            size="md"
            bgColor="#f0f0f0"
            focusBorderColor="#071c29"
            _placeholder={{ opacity: 1, color: "#071c29" }}
            required
          />
          <Input
            placeholder="Location Event"
            name="location"
            value={formData.location}
            onChange={handleChange}
            size="md"
            bgColor="#f0f0f0"
            focusBorderColor="#071c29"
            _placeholder={{ opacity: 1, color: "#071c29" }}
            required
          />
          <Input
            placeholder="Select Start Time and Date"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            size="md"
            type="datetime-local"
            bgColor="#f0f0f0"
            focusBorderColor="#071c29"
            _placeholder={{ opacity: 1, color: "#071c29" }}
            required
          />
          <Input
            placeholder="Select End Time and Date"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            size="md"
            type="datetime-local"
            bgColor="#f0f0f0"
            focusBorderColor="#071c29"
            _placeholder={{ opacity: 1, color: "#071c29" }}
            required
          />
        </Stack>
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting"
          colorScheme="teal"
          marginTop="0.5rem"
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
};
