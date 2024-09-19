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

export const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <Card className="event-card" onClick={handleCardClick}>
      <CardHeader>
        <Heading>{event.title}</Heading>
        <Text>
          {event.categories.map((category, index) => (
            <React.Fragment key={category.id}>
              {category.name}
              {index < event.categories.length - 1 ? ", " : ""} {}
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
            <Text>StartTime: {new Date(event.startTime).toLocaleString()}</Text>
            <Text>EndTime: {new Date(event.endTime).toLocaleString()}</Text>
          </Flex>
          <Text>Desription</Text>
          <Text>{event.description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
