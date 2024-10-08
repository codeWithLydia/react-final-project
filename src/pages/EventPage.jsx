import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { data, loading, error, updateEvent } = useContext(DataContext);

  const [showSuccessEdit, setShowSuccessEdit] = useState(false);
  const [showFailEdit, setShowFailEdit] = useState(false);
  const [showSuccessSubmit, setShowSuccessSubmit] = useState(false);
  const [event, setEvent] = useState(null);

  //Check to see if there is a message in the navigation state
  useEffect(() => {
    if (location.state?.successMessage) {
      setShowSuccessSubmit(true); //show alert when there is a message
      const timer = setTimeout(() => {
        setShowSuccessSubmit(false); // hide alert after 5 sec
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  //As soon as the data is loaded and there are no errors, it retreives the data using the specific event id
  useEffect(() => {
    if (loading) return;
    if (error) return;

    const foundEvent = data.events.find(
      (event) => event.id === parseInt(eventId)
    );
    setEvent(foundEvent);
  }, [loading, error, data, eventId]);

  //Controls the succesEdit message
  useEffect(() => {
    if (showSuccessEdit) {
      const timer = setTimeout(() => {
        setShowSuccessEdit(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessEdit]);

  //Controls the failEdit message
  useEffect(() => {
    if (showFailEdit) {
      const timer = setTimeout(() => {
        setShowFailEdit("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showFailEdit]);

  //Messages for still loading, error and missing data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>There seems to be a problem</p>;
  if (!event) return <p>Event not found</p>;

  // Retreives the categories from events
  const eventCategories = event.categoryIds.map((categoryId) => {
    const category = data.categories.find(
      (category) => category.id === categoryId
    );
    return category ? category.name : "Unknown category";
  });

  // Retreives the user that created the event
  const createdByUser = data.users.find((user) => user.id === event.createdBy);

  //Update the event using the updatEvent function from DataContext
  const handleSave = (newValues) => {
    console.log("Event details updated:", newValues);
    // update the event in the local state
    updateEvent(event.id, { ...event, ...newValues });
    setEvent((prevEvent) => ({
      ...prevEvent,
      ...newValues, //merge with new values
    }));
    setShowSuccessEdit(true);
  };

  // Gets called when the event update failed
  const handleFail = () => {
    setShowFailEdit(true);
  };

  return (
    <Box className="event-page">
      <Flex className="event-details">
        {/* succes message after successfully editing event*/}
        {showSuccessEdit && (
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
            The event has been successfully updated!
            <CloseButton
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setShowSuccessEdit(false)}
            />
          </Alert>
        )}

        {/* Fail message when editing event has failed*/}
        {showFailEdit && (
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
            There was a problem updating the event. Please check and try again
            <CloseButton
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setShowFailEdit(false)}
            />
          </Alert>
        )}

        {/* success alert after adding event*/}
        {showSuccessSubmit && (
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
            {location.state.successMessage}
            <CloseButton
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setShowSuccessSubmit(false)}
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
            <Link to="/eventsPage">
              <Button
                size={{ base: "md", md: "lg" }}
                colorScheme="teal"
                marginBottom="1rem"
              >
                Back to overview
              </Button>
            </Link>

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

          <Box className="event-details-box2">
            <Stack spacing={{ base: "0.5rem", md: "1rem" }}>
              <Text className="h4-text">Description</Text>
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
