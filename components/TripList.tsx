"use client";

import React, { useState } from "react";
import TripCard from "./TripCard";
import { Trip } from "@/lib/types";
import TravelStatusToggle from "./TravelStatusToggle";
import TripDialog from "./TripDialog";
import EditTripDialog from "./EditTripDialog";
import { useAppState } from "@/lib/provider";

const TripList = () => {
  const [completed, setCompleted] = React.useState<boolean | undefined>(
    undefined
  );
  const [isTripDialogVisible, setTripDialogVisibility] = useState(false);
  const [isTripEditVisible, setTripEditVisibility] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { state, dispatch } = useAppState();

  if (state.travels.length === 0) {
    return (
      <p className="text-center mt-8">
        No trips found. Go back to{" "}
        <a href="/" className="text-blue-500 underline">
          home page
        </a>{" "}
      </p>
    );
  }

  const handleStatusChange = (status: boolean | undefined) => {
    setCompleted(status);
  };

  const handleToggleComplete = (trip: Trip) => {
    dispatch({
      type: "TOGGLE_STATUS",
      payload: trip,
    });
  };

  const handleTripDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    setTripDialogVisibility(true);
  };

  const handleTripEdit = (trip: Trip) => {
    setSelectedTrip(trip);
    setTripEditVisibility(true);
  };

  const filteredTravels =
    typeof completed === "boolean"
      ? state.travels.filter(
          (trip) => trip.status === (completed ? "done" : "todo")
        )
      : state.travels;

  const handleTripDetete = (trip: Trip) => {
    dispatch({
      type: "DELETE_TRIP",
      payload: trip.id,
    });
  };

  return (
    <>
      <TravelStatusToggle
        completed={completed}
        handleStatusChange={handleStatusChange}
      />

      {filteredTravels.length === 0 && (
        <p className="text-center mt-8">
          No trips found. Try to select All travels.
        </p>
      )}

      <ul>
        {filteredTravels.map((travel) => {
          const { id, photo_url, title, description } = travel;

          return (
            <li key={id} className="pb-4">
              <TripCard
                imageUrl={photo_url}
                title={title}
                description={description}
                showStatus={completed}
                onDoItAgain={() => handleToggleComplete(travel)}
                onEdit={() => handleTripEdit(travel)}
                onDelete={() => handleTripDetete(travel)}
                onDetails={() => handleTripDetails(travel)}
              />
            </li>
          );
        })}
      </ul>

      {isTripDialogVisible && (
        <TripDialog
          onClose={() => setTripDialogVisibility(false)}
          trip={selectedTrip}
        />
      )}

      {isTripEditVisible && (
        <EditTripDialog
          onClose={() => setTripEditVisibility(false)}
          trip={selectedTrip}
        />
      )}
    </>
  );
};

export default TripList;
