import { GET_LINES, CREATE_LINE } from "../action-types/line";
import { removeHash } from "../services/colors";
import {
  createNewLine,
  getAllLinesByUserIdOrderByMostRecentMemory,
} from "../services/lines";
import server from "../utils/server";
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

// https://github.com/redux-offline/redux-offline
export const createLineForUser =
  (lineTitle, selectedColor, userId) => async (dispatch) => {
    try {
      // const line = await createNewLine(lineTitle, selectedColor);
      const content = {
        name: lineTitle,
        selectedColor,
        userId,
      };
      // console.log("content", content);
      const token = localStorage.token;
      console.log(
        "body",
        JSON.stringify({
          lineName: lineTitle,
          colorHex: removeHash(selectedColor),
        })
      );
      dispatch({
        type: CREATE_LINE,
        payload: content,
        meta: {
          offline: {
            // the network action to execute
            effect: {
              url: `api/lines`,
              // url: `${server.defaults.baseURL}/lines`,
              method: "POST",
              // body: {
              //   lineName: lineTitle,
              //   colorHex: removeHash(selectedColor),
              // },
              body: `lineName=${lineTitle}&colorHex=${removeHash(
                selectedColor
              )}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
            // action to dispatch when effect succeeds:
            commit: { type: GET_LINES, meta: content },
            // action to dispatch if network action fails permanently:
            rollback: { type: CREATE_LINE, meta: content },
          },
        },
      });
    } catch (err) {
      dispatch(setAlert(err.message, "error"));
    }
  };
