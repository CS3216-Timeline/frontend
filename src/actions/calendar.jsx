import {
  GET_DATES_WITH_MEMORIES,
  SET_SELECTED_DATE,
} from "../action-types/calendar";
import server from "../utils/server";
import { setAlert } from "./alert";

export const getDatesWithMemoriesByMonthAndYear =
  (selectedMonth, selectedYear) => async (dispatch) => {
    try {
      let x = selectedMonth + 1;
      const res = await server.get(`/memories/${selectedYear}/${x}`);
      const memoriesDateArr = res.data.numberOfMemories;
      let dateWithMemories = [];
      memoriesDateArr.forEach((memory) =>
        dateWithMemories.push(`${memory.day}-${x}-${selectedYear}`)
      );
      dispatch({
        type: GET_DATES_WITH_MEMORIES,
        payload: dateWithMemories,
      });
    } catch (err) {
      dispatch(setAlert(err.message, "error"));
    }
  };

export const setChosenDate = (chosenDate) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_DATE,
    payload: chosenDate,
  });
};
