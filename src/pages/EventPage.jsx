import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import {
  Heading,
  Text,
  Image,
  Flex,
  Box,
  Stack,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { DeleteButton } from "../components/ui/DeleteButton";
import { EditEventButton } from "../components/ui/EditEventButton";

export const EventPage = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useContext(DataContext);
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

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

  const event = data.events.find((event) => event.id === parseInt(eventId));

  if (!event) return <p>Event not found</p>;

  const eventCategories = event.categoryIds.map((categoryId) => {
    const category = data.categories.find(
      (category) => category.id === categoryId
    );
    return category ? category.name : "Unkown category";
  });

  const createdByUser = data.users.find((user) => user.id === event.createdBy);

  const handleEventDeleted = () => {
    navigate("/eventsPage");
  };

  const handleSave = (newValues) => {
    console.log("Event details updated:", newValues);
    setShowSuccess(true);
  };

  const handleFail = () => {
    setShowFail(true);
  };

  return (
    <Box className="event-page">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {/* Succes Alert*/}
        {showSuccess && (
          <Alert status="success" variant="solid" width="auto" mb={4}>
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

        {/* Fail message*/}
        {showFail && (
          <Alert status="error" variant="solid" width="auto" mb={4}>
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
          mt="1rem"
          spacing="5rem"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Heading
              fontFamily="'Verdana', 'Tahoma', sans-serif"
              color="#071c29"
              fontWeight="200"
              fontSize="2rem"
              margin="0.5rem"
            >
              {event.title}
            </Heading>
            <Text
              fontFamily="'Verdana', 'Tahoma', sans-serif"
              color="#071c29"
              fontWeight="200"
              fontSize="1rem"
              margin="0.5rem"
            >
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

            <Flex>
              <Text
                fontFamily="'Verdana', 'Tahoma', sans-serif"
                color="#071c29"
                fontWeight="200"
                fontSize="1rem"
                mx="0.5rem"
              >
                Start Time: {new Date(event.startTime).toLocaleString()}
              </Text>
              <Text
                fontFamily="'Verdana', 'Tahoma', sans-serif"
                color="#071c29"
                fontWeight="200"
                fontSize="1rem"
                mx="0.5rem"
              >
                End Time: {new Date(event.endTime).toLocaleString()}
              </Text>
            </Flex>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Text
              fontFamily="'Verdana', 'Tahoma', sans-serif"
              color="#071c29"
              fontWeight="200"
              fontSize="1.5rem"
              margin="0.5rem"
            >
              Description
            </Text>
            <Text
              fontFamily="'Verdana', 'Tahoma', sans-serif"
              color="#071c29"
              fontWeight="200"
              fontSize="1rem"
              margin="0.5rem"
            >
              {event.description}
            </Text>
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
              <Text
                fontFamily="'Verdana', 'Tahoma', sans-serif"
                color="#071c29"
                fontWeight="200"
                fontSize="0.75rem"
                margin="0.5rem"
              >
                Created By: {createdByUser ? createdByUser.name : "Unknown"}
              </Text>
            </Flex>

            <Flex flexDir="row" alignItems="center">
              <EditEventButton
                defaultValues={{
                  title: event.title,
                  description: event.description,
                  startTime: new Date(event.startTime)
                    .toISOString()
                    .slice(0, 16),
                  endTime: new Date(event.endTime).toISOString().slice(0, 16),
                }}
                eventId={event.id}
                onSave={handleSave}
                onFail={handleFail}
              />

              <DeleteButton eventId={event.id} onDelete={handleEventDeleted} />
            </Flex>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
