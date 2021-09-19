import server from "../utils/server";

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action-types/auth";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const register = (name, email, password) => async (dispatch) => {
  const body = {
    name,
    email,
    password,
  };

  try {
    const res = await server.post("auth/register", body);
    // res.data just contains the token, and now i need to set the token
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      dispatch(setAlert(err.response.data.error, "error"));
    } else {
      dispatch(setAlert(err.message, "error"));
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
    password,
  };

  try {
    // WE WANT TO LOGIN
    const res = await server.post("auth/login", body);
    // data is the token
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      dispatch(setAlert(err.response.data.error, "error"));
    } else {
      dispatch(setAlert(err.message, "error"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loginWithGoogle = (googleData) => async (dispatch) => {
  const body = {
    token: googleData.tokenId,
  };
  try {
    const res = await server.post("auth/login/google", body);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      dispatch(setAlert(err.response.data.error, "error"));
    } else {
      dispatch(setAlert(err.message, "error"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loginWithFacebook = (facebookData) => async (dispatch) => {
  const body = {
    access_token: facebookData.accessToken,
  };
  try {
    const res = await server.post("auth/login/facebook", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      dispatch(setAlert(err.response.data.error, "error"));
    } else {
      dispatch(setAlert(err.message, "error"));
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
    const res = await server.get("auth");
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
    type: LOGOUT,
  });
};

export const deleteAccount = () => async (dispatch) => {
  try {
    // TODO: connect to backend
    // const res = await server.delete('/auth/userId)
    dispatch({
      type: LOGOUT,
    });
    dispatch(setAlert("Account successfully deleted", "success"));
  } catch (err) {
    throw err;
  }
};