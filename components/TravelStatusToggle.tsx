"use client";

import React, { useState } from "react";

interface TravelStatusToggleProps {
  completed?: boolean;
  handleStatusChange: (status: boolean | undefined) => void;
}

const TravelStatusToggle: React.FC<TravelStatusToggleProps> = ({
  completed,
  handleStatusChange,
}) => {
  const statusMap = {
    All: undefined,
    Upcoming: false,
    Completed: true,
  };

  const status = Object.keys(statusMap);

  function getStatus() {
    for (const [key, value] of Object.entries(statusMap)) {
      if (value === completed) {
        return key;
      }
    }

    return "All";
  }

  function getQuery(status: keyof typeof statusMap) {
    return statusMap[status];
  }

  const index = status.indexOf(getStatus());

  const [selected, setSelected] = useState(index);

  const handleClick = (index: number) => {
    setSelected(index);
    handleStatusChange(getQuery(status[index] as keyof typeof statusMap));
  };

  return (
    <div className="inline-flex bg-gray-100 rounded-full overflow-hidden border border-gray-100">
      {status.map((label, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`py-2 px-4 text-sm font-medium text-black ${
            selected === index
              ? "bg-transparent"
              : "bg-white hover:bg-gray-100 hover:border-white"
          } border-0 focus:outline-none border-l-2 border-gray-100`}
          data-testid={`status-toggle-${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TravelStatusToggle;
