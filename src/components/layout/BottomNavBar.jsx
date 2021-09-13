import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { COLORS } from "../../utils/colors";
import { Link } from "react-router-dom";

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

  return (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction component={Link} to="/" icon={<HomeIcon />} />
      {/* TODO: change the links/icons for these 2 if necessary */}
      <BottomNavigationAction component={Link} to="/" icon={<FavoriteIcon />} />
      <BottomNavigationAction component={Link} to="/" icon={<PersonIcon />} />
      {/* TODO: create a how to use page */}
      <BottomNavigationAction
        component={Link}
        to="/"
        icon={<HelpOutlineIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNavBar;
