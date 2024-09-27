import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const SearchResultModal = ({ isOpen, onClose, results }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div>
      <div className="search-modal">
        <Button colorScheme="teal" onClick={onClose}>
          Close
        </Button>
        {results.length > 0 ? (
          <ul className="modal-list">
            {results.map((event) => (
              <li key={event.id}>
                <Button onClick={() => navigate(`/event/${event.id}`)}>
                  {event.title}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};
