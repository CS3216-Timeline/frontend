import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";

const NotFound = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  if (auth.isAuthenticated) {
    dispatch(setAlert("Invalid URL"));
    return <Redirect to="/" />;
  } else {
    dispatch(setAlert("Invalid URL"));
    return <Redirect to="/signin" />;
  }
};

export default NotFound;
