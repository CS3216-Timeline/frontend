import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopNavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const logoutButtonClicked = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* TODO: Create SideDrawer compinent if necessary */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            App Name
          </Typography>
          <Button color="inherit" onClick={(e) => logoutButtonClicked(e)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNavBar;
