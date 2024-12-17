import { useAppState } from "@/lib/provider";
import { Trip } from "@/lib/types";
import React from "react";
import { useForm, Controller } from "react-hook-form";

interface EditTripFormProps {
  onClose: () => void;
  trip?: Trip | null;
}

const EditTripDialog = ({ onClose, trip }: EditTripFormProps) => {
  const isEdit = !!trip;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: trip?.title || "",
      introduction: trip?.introduction || "",
      description: trip?.description || "",
      photo_url: trip?.photo_url || "",
      itineraries: trip?.itinerary || [
        { day: "", location: "", description: "" },
      ],
    },
  });
  const { dispatch } = useAppState();

  const onSubmit = (data: any) => {
    dispatch({
      type: isEdit ? "UPDATE_TRIP" : "ADD_TRIP",
      payload: {
        ...data,
        id: trip?.id || Math.floor(Math.random() * 1000),
        status: trip?.status || "todo",
      },
    });
    onClose();
  };

  const [itineraries, setItineraries] = React.useState<number>(
    isEdit ? trip?.itinerary.length : 1
  );

  const handleAddItinerary = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setItineraries(itineraries + 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white sm:rounded-xl max-w-lg w-full h-full sm:h-auto sm:max-h-screen overflow-y-auto p-6 relative"
        data-testid="edit-trip-dialog"
      >
        <div className="flex justify-between items-center mb-6 relative">
          <h2 className="text-2xl font-semibold">
            {isEdit ? "Edit the trip" : "Create a trip"}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-1 text-xs">
              Name
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="title"
                  type="text"
                  placeholder="Italy"
                  className="w-full border rounded-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="introduction"
              className="block text-gray-700 text-xs mb-1"
            >
              Introduction (max. 240 characters)
            </label>
            <Controller
              name="introduction"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="introduction"
                  placeholder="From Rome to Venice..."
                  className="w-full border rounded-xl py-2 px-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                  maxLength={240}
                ></textarea>
              )}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-xs mb-1"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="description"
                  rows={4}
                  placeholder="Discover the wonders of the Roman empire..."
                  className="w-full border rounded-xl py-2 px-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                ></textarea>
              )}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="photo_url"
              className="block text-gray-700 text-xs mb-1"
            >
              Image
            </label>
            <Controller
              name="photo_url"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="photo_url"
                  type="text"
                  placeholder="Image URL"
                  className="w-full border rounded-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="block text-gray-700 text-xs mb-2">
              Day by day itinerary
            </label>
            <button
              onClick={(e) => handleAddItinerary(e)}
              className="text-sm text-gray-500 hover:text-black"
            >
              <img
                src="/icons/plus.svg"
                alt="Add day"
                className="w-4 h-4 mr-1"
              />
            </button>
          </div>

          {Array.from({ length: itineraries }).map((_, index) => (
            <div
              className="mb-2 bg-slate-100 p-4 rounded-xl"
              key={`itinerary-${index}`}
            >
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <Controller
                  name={`itineraries.${index}.day`}
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="border rounded-full py-2 px-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
                    >
                      {Array.from({ length: itineraries }).map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <Controller
                  name={`itineraries.${index}.location`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Location"
                      className="flex-1 border rounded-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                  )}
                />
              </div>
              <Controller
                name={`itineraries.${index}.description`}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Description"
                    className="mt-2 w-full border rounded-xl py-2 px-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                  ></textarea>
                )}
              />
            </div>
          ))}

          <button
            type="submit"
            className=" bg-black text-white py-2 px-12 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTripDialog;
