import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { DeleteButton } from "../components/ui/DeleteButton";
import { EditEventButton } from "../components/ui/EditEventButton";

export const EventPage = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useContext(DataContext);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (error) return;

    const foundEvent = data.events.find(
      (event) => event.id === parseInt(eventId)
    );
    setEvent(foundEvent);
  }, [loading, error, data, eventId]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (showFail) {
      const timer = setTimeout(() => {
        setShowFail("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showFail]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There seems to be a problem</p>;
  if (!event) return <p>Event not found</p>;

  const eventCategories = event.categoryIds.map((categoryId) => {
    const category = data.categories.find(
      (category) => category.id === categoryId
    );
    return category ? category.name : "Unkown category";
  });

  const createdByUser = data.users.find((user) => user.id === event.createdBy);

  const handleSave = (newValues) => {
    console.log("Event details updated:", newValues);
    setEvent((prevEvent) => ({
      // update the event in the local state
      ...prevEvent,
      ...newValues, //merge with new values
    }));
    setShowSuccess(true);
  };

  const handleFail = () => {
    setShowFail(true);
  };

  return (
    <Box className="event-page">
      <Flex className="event-details">
        {/* succes message after successfully editing event*/}
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
            The event has been succesfully updated!
            <CloseButton
              position="relative"
              rigth={-1}
              top={-1}
              onClick={() => setShowSuccess(false)}
            />
          </Alert>
        )}

        {/* Fail message when editing event has failed*/}
        {showFail && (
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
            Failed to update the event. Please check and try again
            <CloseButton
              positin="relative"
              rigth={-1}
              top={-1}
              onClick={() => setShowFail(false)}
            />
          </Alert>
        )}

        <Stack
          direction={{ base: "column", md: "row" }}
          flex-wrap="wrap"
          m="1rem"
          spacing={{ base: "2rem", md: "3rem" }}
          alignItems="center"
          justifyContent="center"
        >
          <Box className="event-details-box1">
            <Button
              size={{ base: "md", md: "lg" }}
              colorScheme="teal"
              marginBottom="1rem"
            >
              <Link to="/eventspage">Back to overview</Link>
            </Button>
            <Heading className="h3-text">{event.title}</Heading>
            <Text className="page-text">
              Categories:{" "}
              {eventCategories.map((category, index) => (
                <span key={index}>
                  {category}
                  {index < eventCategories.length - 1 ? ", " : ""}
                </span>
              ))}
            </Text>
            <Image
              boxSize={{ base: "60%", md: "75%" }}
              borderRadius="1rem"
              margin="0.5rem"
              src={event.image}
              alt={event.title}
            />
            <Flex className="time-box">
              <Text className="page-text">
                Start Time:{" "}
                {new Date(event.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text className="page-text">
                End Time:{" "}
                {new Date(event.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Flex>
          </Box>

          <Box className="event-deatils-box2">
            <Stack spacing={{ base: "0.5rem", md: "1rem" }}>
              <Text className="h4-text">Desription</Text>
              <Text className="page-text">{event.description}</Text>
              <Flex flexDir="row" alignItems="center">
                <Image
                  src={
                    createdByUser
                      ? createdByUser.image
                      : "http://via.placeholder.com/50"
                  }
                  alt={createdByUser ? createdByUser.name : "Unknown"}
                  boxSize="50px"
                  borderRadius="full"
                  margin="0.5rem"
                />
                <Text className="page-text">
                  Created By: {createdByUser ? createdByUser.name : "Unknown"}
                </Text>
              </Flex>

              <Flex flexDir="row" alignItems="center">
                <EditEventButton
                  defaultValues={{
                    createdBy: event.createdBy,
                    title: event.title,
                    image: event.image,
                    categoryIds: event.categoryIds || [],
                    description: event.description,
                    location: event.location,
                    startTime: new Date(event.startTime)
                      .toISOString()
                      .slice(0, 16),
                    endTime: new Date(event.endTime).toISOString().slice(0, 16),
                  }}
                  eventId={event.id}
                  categories={data.categories}
                  onSave={handleSave}
                  onFail={handleFail}
                />

                <DeleteButton eventId={event.id} eventName={event.title} />
              </Flex>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
