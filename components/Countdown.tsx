import { useEffect, useState } from "react";
import { Trip } from "@/lib/types";

interface CountdownProps {
  trip: Trip;
  countdownDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ trip, countdownDate }) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const { title, photo_url } = trip;

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const today = new Date();
      const tripDate = new Date(countdownDate);
      const timeDiff = tripDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysRemaining(daysDiff);
    };

    calculateDaysRemaining();
    const interval = setInterval(calculateDaysRemaining, 86400000);

    return () => clearInterval(interval);
  }, [countdownDate]);

  return (
    <div
      className="text-center bg-cover bg-center bg-no-repeat rounded-lg relative w-full h-32 p-4  text-xl text-white"
      style={{ backgroundImage: `url(${photo_url})` }}
    >
      <div className="absolute inset-0 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-xl mb-2 font-bold">{title}</h2>
        <p className="text-lg">
          {daysRemaining} {daysRemaining > 1 ? "days" : "day"} until the trip
        </p>
      </div>
    </div>
  );
};

export default Countdown;
