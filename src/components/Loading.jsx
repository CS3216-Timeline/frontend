import React from "react";
import { ClipLoader } from "react-spinners";
import { makeStyles } from "@material-ui/core";
import { COLORS } from "../utils/colors";
import AppLogo from "./layout/AppLogo";

const useStyles = makeStyles(() => ({
  // loaderContainer: {
  //   position: "absolute",
  //   left: "50%",
  //   top: "50%",
  //   transform: "translate(-50%, -50%)",
  // },
  // items: {
  //   display: "flex",
  //   flexDirection: "column",
  // },
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
