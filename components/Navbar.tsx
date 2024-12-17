"use client";
import Image from "next/image";
import React, { useState } from "react";
import EditTripDialog from "./EditTripDialog";

const Navbar = () => {
  const [isCreateTripVisible, setCreateTripVisibility] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-black p-4 rounded-lg ">
      <div className="text-white text-lg font-bold">
        <span className="flex items-center">
          <Image src="/favicon.png" alt="Logo" width={32} height={32} />
        </span>
      </div>
      <button
        className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200"
        onClick={() => setCreateTripVisibility(true)}
        data-testid="create-trip"
      >
        Create new trip
      </button>
      {isCreateTripVisible && (
        <EditTripDialog onClose={() => setCreateTripVisibility(false)} />
      )}
    </nav>
  );
};

export default Navbar;
