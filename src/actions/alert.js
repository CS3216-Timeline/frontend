import {
  SET_ALERT,
  REMOVE_ALERT
} from "../action-types/alert";

export const setAlert = (message) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      message
    },
  });

  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
  }), 5000);
};