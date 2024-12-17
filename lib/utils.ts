import { Trip } from "./types";

export function filterTrips(trips: Trip[], searchString: string): Trip[] {
  const lowercasedSearchString = searchString.toLowerCase();
  return trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(lowercasedSearchString) ||
      trip.description.toLowerCase().includes(lowercasedSearchString) ||
      trip.itinerary.some(
        (itineraryItem) =>
          itineraryItem.location
            .toLowerCase()
            .includes(lowercasedSearchString) ||
          itineraryItem.description
            .toLowerCase()
            .includes(lowercasedSearchString)
      )
  );
}
