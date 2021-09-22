import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ComboBox from "./ComboBox";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import MapDisplay from "./MapDisplay";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { COLORS } from "../../utils/colors";
import UploadMediaForm from "../UploadMediaForm/UploadMediaForm";
import { useHistory, useParams } from "react-router";
import { createNewMemory, editMemoryDetailsById, getMemoryById } from "../../services/memories";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { getGeographicFeature } from "../../services/locationService";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  addLineButtonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  linesContainer: {
    padding: theme.spacing(2, 2, 15, 2),
  },
}));

const getDefaultViewport = () => ({
  latitude: 1.3521,
  longitude: 103.8198,
  height: "50vh",
  width: "100%",
  zoom: 10,
});

const isEmpty = (val) => val === null || val === undefined || val === "" || val.length === 0;

const MemoryEditor = () => {
  const classes = useStyles();
  const { memoryId, lineId: lineIdFromUrl } = useParams();
  const [currentLocation, setCurrentLocation] = useState({});
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mediaUrls, setMediaUrls] = useState([]); // blob URL
  const [loading, setLoading] = useState(true);
  const [lineId, setLineId] = useState(lineIdFromUrl);
  const [creationDate, setCreationDate] = useState(""); // TODO: REMOVE
  const [viewport, setViewport] = useState(getDefaultViewport());

  const history = useHistory();
  const dispatch = useDispatch();

  const alertError = (msg) => dispatch(setAlert(msg, "error"));

  const isEdit = memoryId ? true : false;

  useEffect(() => {
    if (!isEdit) {
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
      getCurrentLocation();
      return;
    }
    setLoading(false);
    const loadExistingMemoryData = async () => {
      const memoryData = await getMemoryById(memoryId);
      const { title, description, creationDate, lineId,  latitude, longitude } = memoryData;
      const feature = await getGeographicFeature(latitude, longitude);
      setSelectedLocation(feature);
      setCreationDate(creationDate); //TODO: REMOVE
      setLineId(lineId);
      setMemoryTitle(title);
      setMemoryDescription(description);
      setLoading(true);
    }
    loadExistingMemoryData();
  }, [isEdit, memoryId])

  const handleEditMemory = async () => {
    console.log("Editing memory...");
    const memoryChanges = await editMemoryDetailsById(
      memoryId, 
      memoryTitle, 
      memoryDescription, 
      lineId, 
      selectedLocation.latitude, 
      selectedLocation.longitude,
      creationDate //TODO: REMOVE
    )
    console.log(memoryChanges);
    history.push(`memory/${memoryId}`);
  }

  const handleNewMemoryCreation = async () => {
    console.log("Creating memory...");
    const memoryDetails = await createNewMemory(
      memoryTitle, 
      lineId, 
      memoryDescription, 
      selectedLocation.latitude, 
      selectedLocation.longitude, 
      mediaUrls
    );
    const newId = memoryDetails.memoryId;
    history.push(`memory/${newId}`);
  }

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
    if (!isEdit && isEmpty(mediaUrls)) {
      alertError("Please upload a media.");
      return; // TODO: comment out if media endpoint not set
    }

    if (isEdit) {
      handleEditMemory();
    } else {
      handleNewMemoryCreation();
    }
  };

  const mapViewport = {...viewport, ...currentLocation}

  if (!loading) {
    return <Loading />
  }

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
            <Box paddingY={1}>
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
            </Box>
            <Box paddingY={1}>
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
            </Box>
            <Box paddingY={1}>
              <ComboBox
                currentLocation={currentLocation}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                viewport={mapViewport}
                setViewport={setViewport}
              />
            </Box>
            <Box paddingY={1}>
              <MapDisplay
                selectedLocation={selectedLocation}
                viewport={mapViewport}
                setViewport={setViewport}
              />
            </Box>
            {!isEdit && 
              <Box paddingY={1}>
                <UploadMediaForm 
                  existingMediaUrls={mediaUrls} // will be empty
                  onComplete={setMediaUrls}
                />
              </Box>
            }
            {!isEdit && // TODO: REMOVE THIS BLOCK
              <p>
                [TEST] Media:{" "}
                {mediaUrls.length > 0 && (
                  <a key={mediaUrls[0].position} href={mediaUrls[0].url} rel="noreferrer" target="_blank">
                    {mediaUrls[0].url}
                  </a>
                )}
              </p>
            }
            <Box paddingY={1}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={saveHandler}
              >
                Save Memory
              </Button>
            </Box>
            <Box paddingY={1}>
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                onClick={history.goBack}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default MemoryEditor;
