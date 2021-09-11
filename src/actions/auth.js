import server from "../utils/server"

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action-types/auth";
import {
  setAlert
} from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const register =
  (
    username,
    email,
    password
  ) =>
  async (dispatch) => {
    const body = {
      username,
      email,
      password
    };

    try {
      const res = await server.post("/user/register", body);
      // res.data just contains the token, and now i need to set the token
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const error = err.response.data.error;
      if (error) {
        dispatch(setAlert(error));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// LOGIN USER
export const login = (email, password) => async (dispatch) => {
  const body = {
    email,
    password
  };

  try {
    // WE WANT TO LOGIN
    const res = await server.post("/auth/login", body);
    // data is the token
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response)
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  // check local storage
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // this one bascially only job is to get the user.
    const res = await server.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  });
};