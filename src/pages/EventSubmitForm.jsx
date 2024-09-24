import { Stack, Input, Checkbox, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

export const EventSubmitForm = () => {
  const [formData, setFormData] = useState({
    createdBy: 1,
    title: "",
    desciption: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
  });

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
        categoryIds: [...formData.categoyIds, value],
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

    try {
      const response = await fetch("http://localhost3000/events", {
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
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <Flex bgColor="blue.600">
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Input
            placeholder="Title Event"
            name="title"
            value={formData.title}
            onChange={handleChange}
            size="md"
            required
          />
          <Input
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            size="md"
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

          <Input
            placeholder="Desription Event"
            name="description"
            value={formData.description}
            onChange={handleChange}
            size="md"
            required
          />
          <Input
            placeholder="Location Event"
            name="location"
            value={formData.location}
            onChange={handleChange}
            size="md"
            required
          />
          <Input
            placeholder="Select Start Time and Date"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            size="md"
            type="datetime-local"
            required
          />
          <Input
            placeholder="Select End Time and Date"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            size="md"
            type="datetime-local"
            required
          />
        </Stack>
        <Button
          type="submit"
          isLoading={false}
          loadingText="Submitting"
          variant="outline"
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
};
