import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { COLORS } from "../../utils/colors";
import ProfileImage from "./ProfileImage";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 0, 20, 0),
  },
  userName: {
    letterSpacing: theme.spacing(0.5),
    fontSize: "25px",
  },
  changePasswordButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLUE,
  },
  deleteAccountButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.RED,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Box component="div" className={classes.root}>
        <Grid container spacing={0} align="center" justify="center">
          <Grid item xs={12}>
            <Box paddingBottom={4}>
              <ProfileImage />
            </Box>
            <Box paddingBottom={4}>
              <Typography align="center" className={classes.userName}>
                {user.name.toUpperCase()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box padding={1}>
              <Button
                onClick={() => {}}
                fullWidth
                className={classes.changePasswordButton}
                variant="contained"
              >
                <Typography variant="body2">Change Password</Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box padding={1} paddingTop={2}>
              <Button
                onClick={() => {}}
                fullWidth
                variant="contained"
                className={classes.deleteAccountButton}
              >
                <Typography variant="body2">Delete Account</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
