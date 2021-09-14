import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// TODO: show a nice pic and have a button for them to navigate back to the
// signin/ home page
const NotFound = () => {
  const auth = useSelector((state) => state.auth);
  if (auth.isAuthenticated) {
    return <Redirect to="/home" />;
  } else {
    return <Redirect to="/" />;
  }
};

export default NotFound;
