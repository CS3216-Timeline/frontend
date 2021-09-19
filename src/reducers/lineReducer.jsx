import { GET_LINES } from "../action-types/line";

// initialState will contain an object of lines
const initialState = [];

const lineReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LINES:
      return [...payload];
    default:
      return state;
  }
};

export default lineReducer;
