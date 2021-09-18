import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { COLORS } from "../../utils/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  // https://stackoverflow.com/questions/64351827/material-ui-bottomnavigation-does-not-fill-the-width
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    borderTop: `1px solid ${COLORS.LIGHT_GREY}`,
    "& .MuiBottomNavigationAction-root": {
      "@media (max-width: 768px)": {
        minWidth: "auto",
        padding: "6px 0",
      },
    },
  },
});

const BottomNavBar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction
        component="button"
        onClick={() => history.push("/")}
        icon={<HomeIcon />}
      />
      {/* TODO: create a how to use page */}
      <BottomNavigationAction
        component="button"
        onClick={() => history.push("/")}
        icon={<HelpOutlineIcon />}
      />
      <BottomNavigationAction
        component="button"
        onClick={() => history.push("/profile")}
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNavBar;
