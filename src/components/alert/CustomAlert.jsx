import React from "react";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";

const CustomAlert = () => {
  const alert = useSelector((state) => state.alert);
  if (!alert.message) {
    return null;
  }
  return <Alert severity="error">{alert.message}</Alert>;
};

export default CustomAlert;
