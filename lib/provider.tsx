"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Trip } from "@/lib/types";

type State = {
  travels: Trip[];
};

type Action =
  | { type: "ADD_TRIP"; payload: Omit<Trip, "id"> }
  | { type: "UPDATE_TRIP"; payload: Trip }
  | { type: "DELETE_TRIP"; payload: number }
  | { type: "TOGGLE_STATUS"; payload: Trip };

const initialState: State = { travels: [] };

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TRIP":
      return {
        ...state,
        travels: [
          ...state.travels,
          { id: Math.floor(Math.random() * 1000), ...action.payload },
        ],
      };
    case "UPDATE_TRIP":
      return {
        ...state,
        travels: state.travels.map((trip) =>
          trip.id === action.payload.id ? action.payload : trip
        ),
      };
    case "DELETE_TRIP":
      return {
        ...state,
        travels: state.travels.filter((trip) => trip.id !== action.payload),
      };
    case "TOGGLE_STATUS":
      return {
        ...state,
        travels: state.travels.map((trip) =>
          trip.id === action.payload.id
            ? {
                ...trip,
                status: trip.status === "todo" ? "done" : "todo",
              }
            : trip
        ),
      };
    default:
      return state;
  }
}

const StateContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const StateProvider = ({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: State;
}) => {
  const [state, dispatch] = useReducer(reducer, initialData || initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context)
    throw new Error("useAppState must be used within a StateProvider");
  return context;
};

export { reducer };
