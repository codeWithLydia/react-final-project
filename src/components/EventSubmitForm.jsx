import { Stack, Input, Select, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

export const EventSubmitForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    category: "",
    desciption: "",
    location: "",
    startTime: "",
    endTime: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
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
        throw new Error("Network response was not ok");
      }

      console.log("Event submitted succesfully");
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <Flex bgColor="blue.600">
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Input
            placeholder="Full Name"
            size="md"
            name="fullname"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            type="image"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <Input
            placeholder="Title Event"
            size="md"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Select
            placeholder="Select category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Input
            placeholder="Desription Event"
            size="md"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            placeholder="Location Event"
            size="md"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <Input
            placeholder="Select Start Time and Date"
            size="md"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
          <Input
            placeholder="Select End Time and Date"
            size="md"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
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
