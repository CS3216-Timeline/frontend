import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams } from "react-router";
import { getMemoryById } from "../../services/memories";
import { COLORS } from "../../utils/colors";
import { useState } from "react";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import DeleteMemoryDialog from "./DeleteMemoryDialog";
import { useEffect } from "react";
import Photo from "@material-ui/icons/Photo";
import UploadMediaForm from "../UploadMediaForm/UploadMediaForm";
import MemoryMedia from "../UploadMediaForm/MemoryMedia";
import UploadedMediaList from "../UploadMediaForm/UploadedMediaList";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";

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
  const { title, description, mediaUrls: existingMediaUrls, date, lineId } = getMemoryById(memoryId);
  const [loading, setLoading] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [mediaUrls, setMediaUrls] = useState([...existingMediaUrls]);
  const [isMediaEditView, setIsMediaEditView] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(mediaUrls[0].url);

  useEffect(() => {
    if (deleted) {
      history.push(`line/${lineId}`);
    }
  }, [deleted, history, lineId]);

  // do a useEffect to get the memory after endpoint to get a memory is done
  // set previewUrl to 1

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
                  isEmptiable={false}
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

  const setMediaPreview = (idx) => {
    if (idx < mediaUrls.length) {
      setPreviewUrl(mediaUrls[idx].url);
    }
  }

  return (
    <>
      <Box paddingBottom={7}>
        <Box className={classes.alignCenter}>
          <Box display="flex" justifyContent="center" paddingY={2}>
            <PrivatePageHeader text={title} />
          </Box>
          <p><strong>Memory added on</strong> {date}</p>
          <MemoryMedia url={previewUrl} hasMedia={previewUrl != null} />
          <UploadedMediaList 
            mediaUrls={mediaUrls} 
            setMediaPreview={setMediaPreview}
            selectedMediaUrl={previewUrl} 
            isEditable={false}
          />
          <Grid container>
            <Grid item xs={12}>
              <Box paddingX={3}>
                <Button
                  onClick={() => {
                    setIsMediaEditView(!isMediaEditView)
                  }}
                  fullWidth
                  className={classes.editMediaButton}
                  variant="contained"
                  startIcon={<Photo />}
                >
                  Add / Remove Photos
                </Button>
              </Box>
            </Grid>
          </Grid>
          <div className={classes.descriptionStyle}>
            <p>{description}</p>
          </div>
        </Box>
        <Box paddingTop={5}>
          <Grid container>
            <Grid item xs={6}>
              <Box paddingX={3}>
                <Button
                  onClick={() => {
                    history.push(`/memory/${memoryId}/edit`);
                  }}
                  fullWidth
                  className={classes.editButton}
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  Edit Details
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box paddingX={3}>
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
          <Grid item xs={12}>
            <Box margin={3}>
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
        </Box>
        <DeleteMemoryDialog
          setLoading={setLoading}
          displayDeleteDialog={displayDeleteDialog}
          setDisplayDeleteDialog={setDisplayDeleteDialog}
          memoryId={memoryId}
          lineId={lineId}
          setDeleted={setDeleted}
        />
      </Box>
    </>
  );
};

export default Memory;
