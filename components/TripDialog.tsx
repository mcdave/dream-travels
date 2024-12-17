import { useAppState } from "@/lib/provider";
import { Trip } from "@/lib/types";
import React from "react";

interface TripDialogProps {
  onClose: () => void;
  trip: Trip | null;
}

const TripDialog: React.FC<TripDialogProps> = ({ onClose, trip }) => {
  const { state, dispatch } = useAppState();
  const selectedTrip = state.travels.find((t) => t.id === trip?.id);

  if (!trip || !selectedTrip) return null;
  const { title, description, itinerary, photo_url, status } = selectedTrip;

  const isCompleted = status === "done";

  const handleToggleComplete = () => {
    dispatch({
      type: "TOGGLE_STATUS",
      payload: selectedTrip,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white sm:rounded-xl max-w-lg w-full h-full sm:h-auto overflow-y-auto sm:overflow-hidden relative"
        data-testid="trip-dialog"
      >
        <div className="relative">
          <img
            src={photo_url}
            alt="Portugal"
            className="w-full h-48 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <label
            className="flex items-center text-gray-600 mb-4 cursor-pointer"
            data-testid="trip-dialog-status"
          >
            {isCompleted ? (
              <img
                src="/icons/check.svg"
                alt="Checkmark"
                className="w-4 h-4 bg-green-400 rounded-full text-white fill-white"
              />
            ) : (
              <img src="/icons/check.svg" alt="Checkmark" className="w-4 h-4" />
            )}
            <button className="text-sm ml-2" onClick={handleToggleComplete}>
              {isCompleted ? "Complete" : "Mark as completed"}
            </button>
          </label>
          <p
            className="text-gray-600 text-sm mb-4"
            data-testid="trip-dialog-description"
          >
            {description}
          </p>

          {itinerary && itinerary.length > 0 && (
            <>
              <hr className="my-4" />

              <h3 className="text-lg font-semibold mb-2">Itinerary</h3>
              <div className="text-sm" data-testid="itinerary">
                {itinerary.map(({ day, location, description }, index) => (
                  <div key={index} className="relative py-4">
                    {index !== itinerary.length - 1 && (
                      <div className="absolute left-[3px] top-[25px] w-1 border-l border-black -bottom-[25px]" />
                    )}
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="font-medium" data-testid="itinerary-day">
                        Day {day}: {location}
                      </span>
                    </div>
                    <p className="text-gray-500 ml-4">{description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDialog;
