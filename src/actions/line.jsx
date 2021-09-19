import { GET_LINES } from "../action-types/line";
import { getAllLinesByUserIdOrderByMostRecentMemory } from "../services/lines";
import { setAlert } from "./alert";

export const getLines = () => async (dispatch) => {
  try {
    const linesByUser = await getAllLinesByUserIdOrderByMostRecentMemory();
    dispatch({
      type: GET_LINES,
      payload: linesByUser,
    });
  } catch (err) {
    dispatch(setAlert("Error getting lines", "error"));
  }
};
