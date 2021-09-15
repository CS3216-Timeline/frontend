import React, { useState, useEffect } from "react";
import Timeline from "@material-ui/lab/Timeline";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { getLineById } from "../../services/lines";
import { getMemoryById } from "../../services/memories";
import LineCard from "./LineCard";
import EditIcon from "@material-ui/icons/Edit";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import DeleteIcon from "@material-ui/icons/Delete";
import ExploreIcon from "@material-ui/icons/Explore";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { useHistory, useParams } from "react-router-dom";
import { COLORS } from "../../utils/colors";
import DeleteLineDialog from "./DeleteLineDialog";
import Loading from "../../components/Loading";
import LineMap from "../LineMap/LineMap";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0, 6, 0),
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
  mapButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLUE,
  },
  deleteButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.CANCEL_BUTTON,
  },
}));

const isAlternating = () => {
  // if desktop, return true
  return false;
};

const getAlignment = (isAlternating) => {
  return isAlternating ? "alternate" : "left";
};

const getLineInfo = (id) => getLineById(id);
const getMemories = (memoryIds) => memoryIds.map((id) => getMemoryById(id));

const Line = (props) => {
  const classes = useStyles();
  const { lineId } = useParams();
  const history = useHistory();
  const { title, color, memoryIds } = getLineInfo(lineId);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  // https://stackoverflow.com/questions/56608065/fix-cant-perform-a-react-state-update-on-an-unmounted-component-error
  const [deleted, setDeleted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (deleted) {
      history.push("/");
    }
  }, [deleted, history]);
  const memories = getMemories(memoryIds);

  const isAlt = isAlternating();
  const alignment = getAlignment(isAlt);
  const lineSize = memoryIds.length;

  const isFirstMemory = (idx) => idx === 0;
  const isLastMemory = (idx) => idx === lineSize - 1;

  // TODO: useEffect to get the memoreies by lineId

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <PrivatePageHeader text={title} />
        </div>
        <Box paddingTop={2}>
          <Grid container>
            <Grid item xs={4}>
              <Box paddingX={1}>
                <Button
                  // TODO: add lineId as params
                  onClick={() => setShowMap(!showMap)}
                  fullWidth
                  className={classes.mapButton}
                  variant="contained"
                  startIcon={!showMap ? <ExploreIcon /> : <LinearScaleIcon />}
                >
                  <Typography variant="body2">
                    {!showMap ? "map" : "line"}
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box paddingX={1}>
                <Button
                  onClick={() => {
                    history.push(`/edit-line/${lineId}`);
                  }}
                  fullWidth
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  <Typography variant="body2">Edit</Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box paddingX={1}>
                <Button
                  onClick={() => {
                    setDisplayDeleteDialog(!displayDeleteDialog);
                  }}
                  fullWidth
                  className={classes.deleteButton}
                  variant="contained"
                  startIcon={<DeleteIcon />}
                >
                  <Typography variant="body2">Delete</Typography>
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
        {/* TODO: send memories as a prop to LineMap */}
        {showMap ? (
          <LineMap />
        ) : (
          <Timeline align={alignment}>
            {memories.map((memory, idx) => (
              <LineCard
                isFirst={isFirstMemory(idx)}
                isLast={isLastMemory(idx)}
                alternate={isAlt}
                memoryId={memory.memoryId}
                key={memory.memoryId}
                title={memory.title}
                description={memory.description}
                mediaUrl={memory.media.source.url}
                date={memory.date}
                color={color}
              />
            ))}
          </Timeline>
        )}
        <DeleteLineDialog
          displayDeleteDialog={displayDeleteDialog}
          setDisplayDeleteDialog={setDisplayDeleteDialog}
          setLoading={setLoading}
          lineId={lineId}
          setDeleted={setDeleted}
        />
      </div>
    </>
  );
};

export default Line;
