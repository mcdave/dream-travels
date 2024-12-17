"use client";
import React from "react";

type TripCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  showStatus?: boolean;
  onDoItAgain?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDetails: () => void;
};

const TripCard = ({
  imageUrl,
  title,
  description,
  showStatus,
  onDoItAgain,
  onEdit,
  onDelete,
  onDetails,
}: TripCardProps) => {
  return (
    <div
      className="flex flex-wrap w-full text-black rounded-xl border border-gray-200 overflow-hidden"
      data-testid="trip-card"
    >
      <div className="w-full md:w-1/2 h-64 md:h-full bg-gray-200">
        <img
          data-testid="trip-image"
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold" data-testid="trip-title">
            {title}
          </h3>
          <p
            className="text-sm text-neutral-400 mt-2"
            data-testid="trip-description"
          >
            {description}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button
            onClick={onDetails}
            className="text-sm underline text-black mr-4 hover:text-neutral-400"
            data-testid="trip-details"
          >
            See trip details
          </button>
          <div className="space-x-2">
            {showStatus && (
              <button
                className="text-sm text-neutral-400 hover:text-black"
                onClick={onDoItAgain}
                data-testid="do-it-again"
              >
                I want to go back!
              </button>
            )}
            <button
              onClick={onEdit}
              className="text-sm text-neutral-400 hover:text-black"
              data-testid="edit-trip"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-sm text-red-500 hover:underline"
              data-testid="delete-trip"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
