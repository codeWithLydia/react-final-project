import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Image,
  Stack,
  Flex,
} from "@chakra-ui/react";

export const EventCard = ({ event, categories }) => {
  const navigate = useNavigate();

  /* Filters categories array and checks if the categoryIds array contains the category.id so you get the right categories with the event */
  const eventCategories = categories.filter((category) =>
    event.categoryIds.includes(category.id)
  );

  /* When you click the card, you go to the event based on the event id */
  const handleCardClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      bg="#071c29"
      width={{ base: "90%", md: "500px" }}
      height="auto"
      borderRadius="1rem"
      variant="elevated"
      margin="1rem"
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
    >
      <CardHeader>
        <Heading
          fontFamily="'Verdana', 'Tahoma', sans-serif"
          color="#f0f0f0"
          fontWeight="200"
          fontSize="2rem"
        >
          {event.title}
        </Heading>
        <Text
          fontFamily="'Verdana', 'Tahoma', sans-serif"
          color="#f0f0f0"
          fontWeight="200"
          fontSize="1rem"
        >
          {eventCategories.map((category, index) => (
            <React.Fragment key={category.id}>
              {category.name}
              {index < eventCategories.length - 1 && ", "}
            </React.Fragment>
          ))}
        </Text>
      </CardHeader>
      <CardBody>
        <Image
          src={event.image}
          borderRadius="xl"
          height="2xs"
          width="xs"
          bgColor="gray.600"
        />
        <Stack mt="3" spacing="3">
          <Flex justifyContent="flex-start" alignItems="center">
            <Text
              fontFamily="'Verdana', 'Tahoma', sans-serif"
              color="#f0f0f0"
              fontWeight="200"
              fontSize="1rem"
              marginRight="1rem"
            >
              Start Time:
              {new Date(event.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text
              fontFamily="'Verdana', 'Tahoma', sans-serif"
              color="#f0f0f0"
              fontWeight="200"
              fontSize="1rem"
            >
              End Time:{" "}
              {new Date(event.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Flex>
          <Text
            fontFamily="'Verdana', 'Tahoma', sans-serif"
            color="#f0f0f0"
            fontWeight="200"
            fontSize="1.5rem"
          >
            Description
          </Text>
          <Text
            fontFamily="'Verdana', 'Tahoma', sans-serif"
            color="#f0f0f0"
            fontWeight="200"
            fontSize="1rem"
          >
            {event.description}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
