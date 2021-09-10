import {
  SET_ALERT,
  REMOVE_ALERT,
} from "../action-types/alert";

const initialState = {
  message: null,
};

const alertReducer = (state = initialState, action) => {
  const {
    type,
    payload
  } = action;
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        message: payload.message,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default alertReducer;