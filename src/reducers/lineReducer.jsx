import { CREATE_LINE, GET_LINES } from "../action-types/line";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
// initialState will contain an object of lines
const initialState = [];

const lineReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LINES:
      // return [];
      console.log("GET_LINES");
      return [...payload];
    case CREATE_LINE:
      console.log("CREATE_LINE");
      console.log("createline content", payload);
      const line = {
        ...payload,
        lineId: uuidv4(),
        lastUpdatedDate: moment().format().toString(),
        memories: [],
      };
      return [line, ...state];
    default:
      return state;
  }
};

export default lineReducer;
