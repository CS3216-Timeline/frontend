import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logoImage from "../../assets/timeline-logo.png";

const useStyles = makeStyles(() => ({
  logoImage: {
    width: "80%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const AppLogo = () => {
  const classes = useStyles();
  return <img className={classes.logoImage} src={logoImage} alt={"logo"} />;
};

export default AppLogo;
