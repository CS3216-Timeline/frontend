import React, { useState, useEffect } from "react";
import Timeline from "@material-ui/lab/Timeline";
import { IconButton, makeStyles } from "@material-ui/core";
import { getLineById } from "../../services/lines";
import { getMemoryById } from "../../services/memories";
import LineCard from "./LineCard";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { useHistory, useParams } from "react-router-dom";
import { COLORS } from "../../utils/colors";
import DeleteLineDialog from "./DeleteLineDialog";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0, 6, 0),
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
  deleteIcon: {
    color: COLORS.CANCEL_BUTTON,
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
  const { line_id } = useParams();
  const histroy = useHistory();
  const { title, color, memoryIds } = getLineInfo(line_id);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  // https://stackoverflow.com/questions/56608065/fix-cant-perform-a-react-state-update-on-an-unmounted-component-error
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (deleted) {
      histroy.push("/home");
    }
  }, [deleted, histroy]);

  const memories = getMemories(memoryIds);

  const isAlt = isAlternating();
  const alignment = getAlignment(isAlt);
  const lineSize = memoryIds.length;

  const isFirstMemory = (idx) => idx === 0;
  const isLastMemory = (idx) => idx === lineSize - 1;

  // TODO: useEffect to get the memoreies by line_id

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <PrivatePageHeader text={title} />
        </div>
        <div className={classes.header}>
          <IconButton
            onClick={() => {
              histroy.push(`/edit-line/${line_id}`);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => {
              setDisplayDeleteDialog(!displayDeleteDialog);
            }}
            className={classes.deleteIcon}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <Timeline align={alignment}>
          {memories.map((memory, idx) => (
            <LineCard
              isFirst={isFirstMemory(idx)}
              isLast={isLastMemory(idx)}
              alternate={isAlt}
              memoryId={memory.memory_id}
              key={memory.memory_id}
              title={memory.title}
              description={memory.description}
              mediaUrl={memory.media.source.url}
              date={memory.date}
              color={color}
            />
          ))}
        </Timeline>
        <DeleteLineDialog
          displayDeleteDialog={displayDeleteDialog}
          setDisplayDeleteDialog={setDisplayDeleteDialog}
          setLoading={setLoading}
          line_id={line_id}
          setDeleted={setDeleted}
        />
      </div>
    </>
  );
};

export default Line;
