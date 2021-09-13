import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import { COLORS } from "../../utils/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    borderTop: `1px solid ${COLORS.LIGHT_GREY}`,
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
    </BottomNavigation>
  );
};

export default BottomNavBar;
