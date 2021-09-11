import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ComboBox from "./ComboBox";
import { Grid, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  addLineButtonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  textFieldContainer: {
    padding: theme.spacing(1, 0, 1, 0),
  },
  linesContainer: {
    padding: theme.spacing(2, 2, 15, 2),
  },
}));

// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
const AddMemory = () => {
  const classes = useStyles();
  const [currentLocation, setCurrentLocation] = useState({});
  const [memoryTitle, setMemoryTitle] = useState("");

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords) {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.linesContainer}>
          <Grid item xs={12}>
            <Typography variant="h2">Add a memory!</Typography>
            <div className={classes.textFieldContainer}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Memory Title"
                name="memoryTitle"
                autoFocus
                onChange={(e) => setMemoryTitle(e.target.value)}
              >
                {memoryTitle}
              </TextField>
            </div>
            <div className={classes.textFieldContainer}>
              <ComboBox currentLocation={currentLocation} />
            </div>
            {/* section to add photo */}
            {/* Button to add the memory */}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddMemory;
