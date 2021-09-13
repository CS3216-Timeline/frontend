import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ComboBox from "./ComboBox";
import { Button, Grid, TextField } from "@material-ui/core";
import MapDisplay from "./MapDisplay";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { COLORS } from "../../utils/colors";

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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 1.3521,
    longitude: 103.8198,
    height: "50vh",
    width: "100%",
    zoom: 10,
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position.coords) {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      });
    };
    getCurrentLocation();
  }, [viewport]);

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.linesContainer}>
          <Grid item xs={12}>
            <PrivatePageHeader
              text={"Add Memory"}
              icon={
                <AddAPhotoIcon
                  style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
                />
              }
            />
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
              <ComboBox
                currentLocation={currentLocation}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                viewport={viewport}
                setViewport={setViewport}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <MapDisplay
                selectedLocation={selectedLocation}
                viewport={viewport}
                setViewport={setViewport}
              />
            </div>
            {/* section to add photo */}
            <div className={classes.textFieldContainer}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                  console.log("creating memory");
                }}
              >
                Add Line
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddMemory;
