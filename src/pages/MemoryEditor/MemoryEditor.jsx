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
import UploadMediaForm from "../UploadMediaForm/UploadMediaForm";
import { useHistory, useParams } from "react-router";
import { getMemoryById } from "../../services/memories";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { getGeographicFeature } from "../../services/locationService";

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
// TODO: pass line as a prop

const getDefaultViewport = () => ({
  latitude: 1.3521,
  longitude: 103.8198,
  height: "50vh",
  width: "100%",
  zoom: 10,
})

const isEmpty = val => val === null || val === undefined || val === ""

const MemoryEditor = props => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null); // base64 encoded URL
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [viewport, setViewport] = useState(getDefaultViewport());

  const history = useHistory()
  const dispatch = useDispatch()

  const alertError = msg => dispatch(setAlert(msg, "error"));

  const classes = useStyles();
  const urlParams = useParams() // Read params from URL
  // urlParams contain EITHER lineId (new) or memoryId (existing)
  const { memoryId, lineId } = urlParams; 

  // if URL param contains memoryId, then there is existing memory
  const isEdit = memoryId ? true : false;

  const getLocationFromCoordinates = async (latitude, longitude) => {
    try {
      const res = await getGeographicFeature(latitude, longitude);
      const processedRes = res.data.features.map((location) => {
        return {
          place_name: location.place_name,
          geometry: location.geometry,
        };
      })
      if (!processedRes) {
        return;
      }
      setSelectedLocation(processedRes[0])
    } catch (err) {
      console.log(err.message);
    }
  };
  if (isEdit && !isDataLoaded) {
    console.log("isLineIdEmpty?", isEmpty(lineId))
    // fetch memory from backend, need error handling!
    const memory = getMemoryById(memoryId)

    getLocationFromCoordinates(memory.latitude, memory.longitude)

    const existingViewport = {
      ...viewport,
      latitude: memory.latitude,
      longitude: memory.longitude,
    }

    // TODO: update component states to reflect existing memory data
    // currently MOCK data
    setSelectedLocation(null)
    setMemoryTitle(memory.title) 
    setMemoryDescription(memory.description)
    setMediaUrl(memory.media.source.url)
    setViewport(existingViewport)
    // setCurrentLocation({})

    // set isDataLoaded to true
    setIsDataLoaded(true)
  }

  //http://localhost:3000/line/1/add-memory
  const saveHandler = (e) => {
    e.preventDefault();
    if (isEmpty(memoryTitle)) {
      alertError("Title cannot be empty.");
      return;
    }
    if (isEmpty(memoryDescription)) {
      alertError("Description cannot be empty.");
      return;
    }
    if (isEmpty(selectedLocation)) {
      alertError("Location cannot be empty.");
      return;
    }
    if (isEmpty(mediaUrl)) {
      alertError("Please upload a media.");
      return;
    }
    // TODO: maybe both can have same way of handling
    // (if backend decides to use POST for editing as well)
    if (isEdit) {
      // TODO: backend PUT request
      // save to existing memory
      // redirect back to Memory  page
      history.push(`memory/${memoryId}`)
    } else {
      // TODO: backend POST request
      // add new memory to line
      const newMemoryId = 99 // will be created by backend
      // redirect to new memory page
      history.push(`memory/${newMemoryId}`)
    }
  }

  useEffect(() => {
    const getCurrentLocation = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position.coords) {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          if (isEdit) {
            // do not set to current in edit mode
            return;
          }
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      });
    };
    getCurrentLocation();
  }, [viewport, isEdit]);

  // TODO: connect to backend
  // const addMemoryToLine = () => {};

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.linesContainer}>
          <Grid item xs={12}>
            <PrivatePageHeader
              text={`${isEdit ? "Edit" : "Add"} Memory`}
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
                autoFocus={!isEdit}
                value={memoryTitle}
                onChange={(e) => setMemoryTitle(e.target.value)}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                id="filled-multiline-static"
                label="Memory Description"
                multiline
                fullWidth
                rows={4}
                placeholder="Optional"
                variant="outlined"
                margin="normal"
                value={memoryDescription}
                onChange={(e) => setMemoryDescription(e.target.value)}
              />
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
            <div className={classes.textFieldContainer}>
              <UploadMediaForm
                doneHandler={setMediaUrl}
              />
            </div>
            <p>[TEST] Media Link: {mediaUrl && <a href={mediaUrl} rel="noreferrer" target="_blank">Copy This Link</a>}</p>
            <div className={classes.textFieldContainer}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={saveHandler}
              >
                Save Memory
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default MemoryEditor;
