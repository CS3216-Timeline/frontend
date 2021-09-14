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
import { useParams } from "react-router";
import { getMemoryById } from "../../services/memories";

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

const DEFAULT_VIEWPORT = {
  latitude: 1.3521,
  longitude: 103.8198,
  height: "50vh",
  width: "100%",
  zoom: 10,
}

const isEmpty = val => val === null || val === undefined || val === ""

const MemoryEditor = props => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [memoryTitle, setMemoryTitle] = useState(null);
  const [memoryDescription, setMemoryDescription] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null); // base64 encoded URL
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [viewport, setViewport] = useState({...DEFAULT_VIEWPORT});

  const classes = useStyles();
  const urlParams = useParams() // Read params from URL
  // urlParams contain EITHER lineId (new) or memoryId (existing)
  const { memoryId, lineId } = urlParams; 

  // if URL param contains memoryId, then there is existing memory
  const isEdit = memoryId ? true : false;

  if (isEdit && !isDataLoaded) {
    console.log("isLineIdEmpty?", isEmpty(lineId))
    // fetch memory from backend, need error handling!
    const memory = getMemoryById(memoryId)

    // TODO: update component states to reflect existing memory data
    setSelectedLocation({})
    setMemoryTitle(memory.title)
    setMemoryDescription("")
    setMediaUrl(null)
    setViewport({...DEFAULT_VIEWPORT})
    // setCurrentLocation({})

    // set isDataLoaded to true
    setIsDataLoaded(true)
  }

  const saveHandler = (e) => {
    e.preventDefault();
    // add guard clauses here, to validate form
    if (isEmpty(memoryTitle)) {
      // alert empty title
      console.log("Title cannot be empty.");
      return;
    }
    if (isEmpty(memoryDescription)) {
      // alert empty description
      console.log("Memory cannot be empty.");
      return;
    }
    if (isEmpty(selectedLocation)) {
      // alert no location selected
      console.log("Selected location cannot be empty");
      return;
    }
    if (isEmpty(mediaUrl)) {
      // alert no media
      console.log("Media url cannot be empty");
      return;
    }
    if (isEdit) {
      // TODO
      // save to existing memory
      // redirect back to Memory  page
    } else {
      // TODO
      // add new memory to line
      // redirect to new memory page
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
                autoFocus
                onChange={(e) => setMemoryTitle(e.target.value)}
              >
                {memoryTitle}
              </TextField>
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
                onChange={(e) => setMemoryDescription(e.target.value)}
              >
                {memoryDescription}
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
