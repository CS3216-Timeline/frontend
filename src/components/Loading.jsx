import React from "react";
import { ClipLoader } from "react-spinners";
import { makeStyles } from "@material-ui/core";
import { COLORS } from "../utils/colors";

const useStyles = makeStyles(() => ({
  loaderContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <ClipLoader color={COLORS.PRIMARY_PURPLE} loading={true} size={30} />
    </div>
  );
};

export default Loading;
