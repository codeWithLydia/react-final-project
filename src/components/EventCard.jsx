import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const EventCard = ({ event, categories }) => {
  const navigate = useNavigate();

  const eventCategories = categories.filter((category) =>
    event.categoryIds.includes(category.id)
  );

  const handleCardClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      bg="#071c29"
      width="500px"
      height="auto"
      borderRadius="1rem"
      variant="elevated"
      margin="1rem"
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
          <Flex>
            <Text
              fontFamily="'Verdana', 'Tahoma', sans-serif"
              color="#f0f0f0"
              fontWeight="200"
              fontSize="1rem"
            >
              StartTime: {new Date(event.startTime).toLocaleString()}
            </Text>
            <Text
              fontFamily="'Verdana', 'Tahoma', sans-serif"
              color="#f0f0f0"
              fontWeight="200"
              fontSize="1rem"
            >
              EndTime: {new Date(event.endTime).toLocaleString()}
            </Text>
          </Flex>
          <Text
            fontFamily="'Verdana', 'Tahoma', sans-serif"
            color="#f0f0f0"
            fontWeight="200"
            fontSize="1.5rem"
          >
            Desription
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
