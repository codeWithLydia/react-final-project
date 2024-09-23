import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { Heading, Text, Image, Flex, Button } from "@chakra-ui/react";

export const EventPage = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useContext(DataContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There seems to be a problem</p>;

  const event = data.events.find((event) => event.id === parseInt(eventId));

  if (!event) return <p>Event not found</p>;

  const eventCategories = event.categoryIds.map((categoryId) => {
    const category = data.categories.find(
      (category) => category.id === categoryId
    );
    return category ? category.name : "Unkown category";
  });

  const createdByUser = data.users.find((user) => user.id === event.createdBy);

  return (
    <Flex>
      <Heading>{event.title}</Heading>
      <Text>
        Categories:{" "}
        {eventCategories.map((category, index) => (
          <span key={index}>
            {category}
            {index < eventCategories.length - 1 ? ", " : ""}
          </span>
        ))}
      </Text>
      <Image src={event.image} alt={event.title} />
      <Flex>
        <Text>Start Time: {new Date(event.startTime).toLocaleString()}</Text>
        <Text>End Time: {new Date(event.endTime).toLocaleString()}</Text>
      </Flex>
      <Text>Description</Text>
      <Text>{event.description}</Text>
      <Flex>
        <Image
          src={
            createdByUser
              ? createdByUser.image
              : "http://via.placeholder.com/50"
          }
          alt={createdByUser ? createdByUser.name : "Unknown"}
          boxSize="50px"
          borderRadius="full"
        />
        <Text>
          Created By: {createdByUser ? createdByUser.name : "Unknown"}
        </Text>
      </Flex>
      <Flex>
        <Button colorScheme="blue">Edit event</Button>
        <Button colorScheme="blue">Delete event</Button>
      </Flex>
    </Flex>
  );
};
