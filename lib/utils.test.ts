import { filterTrips } from "./utils";
import { Trip } from "./types";

describe("filterTrips", () => {
  const trips: Trip[] = [
    {
      title: "Beach Vacation",
      description: "A relaxing beach vacation",
      itinerary: [
        { location: "Miami Beach", description: "Sunbathing" },
        { location: "Ocean Drive", description: "Nightlife" },
      ],
    },
    {
      title: "Mountain Adventure",
      description: "Hiking and camping in the mountains",
      itinerary: [
        { location: "Rocky Mountains", description: "Hiking" },
        { location: "Mountain Peak", description: "Camping" },
      ],
    },
  ];

  it("should filter trips by title", () => {
    const result = filterTrips(trips, "Beach");
    expect(result).toEqual([trips[0]]);
  });

  it("should filter trips by description", () => {
    const result = filterTrips(trips, "relaxing");
    expect(result).toEqual([trips[0]]);
  });

  it("should filter trips by itinerary location", () => {
    const result = filterTrips(trips, "Rocky Mountains");
    expect(result).toEqual([trips[1]]);
  });

  it("should filter trips by itinerary description", () => {
    const result = filterTrips(trips, "Camping");
    expect(result).toEqual([trips[1]]);
  });

  it("should return an empty array if no trips match the search string", () => {
    const result = filterTrips(trips, "Desert");
    expect(result).toEqual([]);
  });

  it("should be case insensitive", () => {
    const result = filterTrips(trips, "beach");
    expect(result).toEqual([trips[0]]);
  });
});
