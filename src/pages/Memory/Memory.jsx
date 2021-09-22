import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams } from "react-router";
import { getMemoryById } from "../../services/memories";
import { convertUTCtoYYYYMMDDHHMM } from "../../utils/datetime";
import { COLORS } from "../../utils/colors";
import { useState } from "react";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import DeleteMemoryDialog from "./DeleteMemoryDialog";
import { useEffect } from "react";
import Photo from "@material-ui/icons/Photo";
import DeleteIcon from "@material-ui/icons/Delete";
import UploadMediaForm from "../UploadMediaForm/UploadMediaForm";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import MediaDisplay from "./MediaDisplay";
import FadeIn from "react-fade-in/lib/FadeIn";
import { Typography } from "@mui/material";
import { getGeographicFeature } from "../../services/locationService";

const useStyles = makeStyles((theme) => ({
  alignCenter: {
    textAlign: "center",
  },
  descriptionStyle: {
    padding: "0% 5%",
  },
  deleteButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.CANCEL_BUTTON,
  },
  imageStyle: {
    width: "90vw",
    height: "90vw",
    textAlign: "center",
  },
  editMediaButton: {
    color: COLORS.BLACK,
    backgroundColor: COLORS.LIGHT_GREEN,
  },
  root: {
    backgroundColor: theme.palette.background.default,
  },
  memoryContainer: {
    padding: theme.spacing(2, 2, 15, 2),
  },
}));

const Memory = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { memoryId } = useParams();

  const [title, setTitle] = useState("");
  const [lineId, setLineId] = useState("");
  const [description, setDescription] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [location, setLocation] = useState("");
  const [mediaUrls, setMediaUrls] = useState([]);

  const [loading, setLoading] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isMediaEditView, setIsMediaEditView] = useState(false);

  useEffect(() => {
    if (deleted) {
      history.push(`line/${lineId}`);
    }
  }, [deleted, history, lineId]);

  useEffect(() => {
    setLoading(true);
    const getMemoryDetails = async () => {
      const memoryData = await getMemoryById(memoryId);
      const { title, description, creationDate, lineId,  latitude, longitude, mediaUrls } = memoryData;
      console.log(memoryData);
      const location = await getGeographicFeature(latitude, longitude);
      setLocation(location);
      setTitle(title);
      setDescription(description);
      setCreationDate(convertUTCtoYYYYMMDDHHMM(creationDate));
      setLineId(lineId);
      setMediaUrls(mediaUrls)

      // states already loaded
      setLoading(false);
    }
    getMemoryDetails()
  }, [memoryId]);


  useEffect(() => {
    // TODO: trigger updates for every mediaUrl changes?
  }, [mediaUrls]);

  if (loading) {
    return <Loading />;
  }
  if (isMediaEditView) {
    // because states are essentially shared
    return (
      <>
        <div className={classes.root}>
          <Grid container className={classes.memoryContainer}>
            <Grid item xs={12}>
              <Box paddingY={1}>
                <UploadMediaForm 
                  existingMediaUrls={mediaUrls} 
                  onComplete={setMediaUrls} 
                />
              </Box>
              <Box paddingY={1}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={() => setIsMediaEditView(!isMediaEditView)}
                >
                  Back to Memory
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </>
    )
  }

  return (
    <>
      <FadeIn>
        <Box paddingBottom={7}>
          <Box >
            <Box display="flex" justifyContent="center" paddingTop={2}>
              <PrivatePageHeader text={title} />
            </Box>
            {mediaUrls.length > 0 && <Box display="flex" justifyContent="center" marginBottom={3}>
              <MediaDisplay mediaUrls={mediaUrls} />
            </Box>}
            <Box className={classes.descriptionStyle} marginBottom={3}>
              <Typography variant="body2">Memory Added on <strong>{creationDate}</strong></Typography>
            </Box>
            {location && location.place_name &&
              <Box className={classes.descriptionStyle} marginBottom={3}>
                <Typography variant="body2">Location: <strong>{location.place_name}</strong></Typography>
              </Box>
            }
            <Box className={classes.descriptionStyle}>
              <Typography variant="body2">{description}</Typography>
            </Box>
          </Box>
        </Box>
        <Box paddingY={3} paddingX={1}>
          <Grid container>
            <Grid item xs={4}>
              <Box paddingX={0.5}>
                <Button
                  onClick={() => {
                    history.push(`/memory/${memoryId}/edit`);
                  }}
                  fullWidth
                  className={classes.editButton}
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box paddingX={0.5}>
                <Button
                  onClick={() => {
                    setIsMediaEditView(!isMediaEditView)
                  }}
                  fullWidth
                  className={classes.editMediaButton}
                  variant="contained"
                  startIcon={<Photo />}
                >
                  Photos
                </Button>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box paddingX={0.5}>
                <Button
                  onClick={() => {
                    setDisplayDeleteDialog(true);
                  }}
                  fullWidth
                  className={classes.deleteButton}
                  variant="contained"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Box paddingX={0.5} paddingY={5}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={() => history.push(`/line/${lineId}`)}
                  startIcon={<ArrowBackIcon />}
                >
                  Back to line page
                </Button>
              </Box>
            </Grid>
          </Grid>
          <DeleteMemoryDialog
            setLoading={setLoading}
            displayDeleteDialog={displayDeleteDialog}
            setDisplayDeleteDialog={setDisplayDeleteDialog}
            memoryId={memoryId}
            lineId={lineId}
            setDeleted={setDeleted}
          />
        </Box>
      </FadeIn>
    </>
  );
};

export default Memory;
