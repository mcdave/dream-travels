"use client";
import React, { useState, useEffect } from "react";
import { Trip } from "@/lib/types";
import Countdown from "./Countdown";

interface CountdownWrapperProps {
  travels: Trip[];
}

const CountdownWrapper: React.FC<CountdownWrapperProps> = ({ travels }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    const savedTrip = localStorage.getItem("selectedTrip");
    const savedCountdown = localStorage.getItem("countdown");

    if (savedTrip && savedCountdown) {
      setSelectedTrip(JSON.parse(savedTrip));
      setCountdown(savedCountdown);
    }
  }, []);

  const handleRandomTrip = () => {
    if (!selectedTrip) {
      const randomTrip = travels[Math.floor(Math.random() * travels.length)];
      const tripDate = new Date();

      tripDate.setMonth(tripDate.getMonth() + 3);
      const countdownDate = tripDate.toISOString().split("T")[0];
      localStorage.setItem("selectedTrip", JSON.stringify(randomTrip));
      localStorage.setItem("countdown", countdownDate);
      setSelectedTrip(randomTrip);
      setCountdown(countdownDate);
    }
  };

  return (
    <div className="mb-8 w-full">
      {!selectedTrip && (
        <div>
          <p className="mb-2">Don't know where to go?</p>
          <button
            onClick={handleRandomTrip}
            className=" bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
          >
            Select random trip
          </button>
        </div>
      )}
      {selectedTrip && countdown && (
        <Countdown trip={selectedTrip} countdownDate={countdown} />
      )}
    </div>
  );
};

export default CountdownWrapper;
