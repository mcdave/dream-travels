"use client";
import React from "react";

const Hero = (props: { query?: string[] | string }) => {
  const { query } = props;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    const value = input?.value;

    if (value) {
      window.location.href = `/?query=${value}`;
    }

    if (!value) {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-9">
      <h1 className="text-4xl font-bold text-black text-center">
        The places you dream of
      </h1>
      <p className="text-lg text-gray-600 mt-2 text-center">
        Let’s live new adventures
      </p>

      <form onSubmit={handleSubmit} className="relative mt-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search trips"
          className="w-full border border-gray-300 rounded-full py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent"
          defaultValue={query}
          data-testid="search-input"
        />
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-1 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
          data-testid="search-button"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
