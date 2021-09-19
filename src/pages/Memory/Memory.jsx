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
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import MediaDisplay from "./MediaDisplay";

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
  const [mediaUrls, setMediaUrls] = useState(existingMediaUrls);
  const [isEditView, setIsEditView] = useState(false);

  useEffect(() => {
    if (deleted) {
      history.push(`line/${lineId}`);
    }
  }, [deleted, history, lineId]);

  // do a useEffect to get the memory after endpoint to get a memory is done

  if (loading) {
    return <Loading />;
  }

  if (isEditView) {
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
                  onClick={() => setIsEditView(!isEditView)}
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
      <Box paddingBottom={7}>
        <Box className={classes.alignCenter}>
          <Box display="flex" justifyContent="center" paddingTop={2}>
            <PrivatePageHeader text={title} />
          </Box>
          <p><strong>Memory added on</strong> {date}</p>
          {/* TODO: Implement multiple photo viewing */}
          <Box display="flex" justifyContent="center">
            <MediaDisplay mediaUrls={mediaUrls} />
          </Box>
          <br /><br />
          <Grid container>
            <Grid item xs={12}>
              <Box paddingX={3}>
                <Button
                  onClick={() => {
                    setIsEditView(!isEditView)
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
                  Edit
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
