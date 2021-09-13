import React from "react";
import { ClipLoader } from "react-spinners";
import { makeStyles } from "@material-ui/core";
import { COLORS } from "../utils/colors";
import AppLogo from "./layout/AppLogo";

const useStyles = makeStyles(() => ({
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `${window.innerHeight}px`,
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <AppLogo />
      <ClipLoader color={COLORS.PRIMARY_PURPLE} loading={true} size={50} />
    </div>
  );
};

export default Loading;
