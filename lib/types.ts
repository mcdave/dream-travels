export type Trip = {
  id: number;
  title: string;
  description: string;
  photo_url: string;
  introduction: string;
  status: "todo" | "doing" | "done";
  itinerary: ItineraryItem[];
};

export type ItineraryItem = {
  day: number;
  location: string;
  description: string;
};
