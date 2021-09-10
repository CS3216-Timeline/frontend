import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import { Typography } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

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
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        // TODO: Probably need to useHistory to push to the other pages
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label={<Typography variant="body2">Home</Typography>}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label={<Typography variant="body2">Favorites</Typography>}
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label={<Typography variant="body2">Profile</Typography>}
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNavBar;
