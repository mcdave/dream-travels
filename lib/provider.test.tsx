import { reducer } from "./provider";

describe("reducer", () => {
  const initialState = { travels: [] };

  it("should add a trip", () => {
    const action = {
      type: "ADD_TRIP",
      payload: { destination: "Paris", date: "2023-10-10", status: "todo" },
    };
    const state = reducer(initialState, action);
    expect(state.travels.length).toBe(1);
    expect(state.travels[0]).toMatchObject(action.payload);
  });

  it("should update a trip", () => {
    const initialStateWithTrip = {
      travels: [
        { id: 1, destination: "Paris", date: "2023-10-10", status: "todo" },
      ],
    };
    const action = {
      type: "UPDATE_TRIP",
      payload: {
        id: 1,
        destination: "London",
        date: "2023-11-11",
        status: "done",
      },
    };
    const state = reducer(initialStateWithTrip, action);
    expect(state.travels[0]).toMatchObject(action.payload);
  });

  it("should delete a trip", () => {
    const initialStateWithTrip = {
      travels: [
        { id: 1, destination: "Paris", date: "2023-10-10", status: "todo" },
      ],
    };
    const action = { type: "DELETE_TRIP", payload: 1 };
    const state = reducer(initialStateWithTrip, action);
    expect(state.travels.length).toBe(0);
  });

  it("should toggle trip status", () => {
    const initialStateWithTrip = {
      travels: [
        { id: 1, destination: "Paris", date: "2023-10-10", status: "todo" },
      ],
    };
    const action = {
      type: "TOGGLE_STATUS",
      payload: {
        id: 1,
        destination: "Paris",
        date: "2023-10-10",
        status: "todo",
      },
    };
    const state = reducer(initialStateWithTrip, action);
    expect(state.travels[0].status).toBe("done");
  });
});
