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

const useStyles = makeStyles(() => ({
  alignCenter: {
    textAlign: "center",
  },
  descriptionStyle: {
    padding: "0% 5%",
    textAlign: "center",
  },
  deleteButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.CANCEL_BUTTON,
  },
  imageStyle: {
    width: "90%",
    textAlign: "center",
  },
}));

const Memory = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { memoryId } = useParams();
  const { title, description, media, date, lineId } = getMemoryById(memoryId);
  const [loading, setLoading] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [deleted, setDeleted] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const mediaUrl = media.source.url;
  // const { title, description, mediaUrl, date } = props.location.state;

  useEffect(() => {
    if (deleted) {
      history.push(`line/${lineId}`);
    }
  }, [deleted, history, lineId]);

  // do a useEffect to get the memory after endpoint to get a memory is done

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box className={classes.alignCenter}>
        <h1>{title}</h1>
        <img alt={title} className={classes.imageStyle} src={mediaUrl} />
        <h4>{date}</h4>
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
                  console.log("editing");
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
    </>
  );
};

export default Memory;
