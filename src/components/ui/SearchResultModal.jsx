import React from "react";

export const SearchResultModal = ({ isOpen, onClose, results }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <button onClick={onClose}>Close</button>
        {results.length > 0 ? (
          <ul>
            {results.map((event) => (
              <li key={event.id}>
                <a href={`/event/${event.id}`}>{event.title}</a>
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
