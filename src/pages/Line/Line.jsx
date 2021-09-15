import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import { IconButton, makeStyles } from "@material-ui/core";
import { getLineById } from "../../services/lines";
import { getMemoryById } from "../../services/memories";
import LineCard from "./LineCard";
import EditIcon from "@material-ui/icons/Edit";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { useHistory, useParams } from "react-router-dom";
// import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0, 6, 0),
  },
  header: {
    display: "flex",
    justifyContent: "center",
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
  // const { lineId } = props;
  const histroy = useHistory();
  // const { line_id } = useParams() // for edit purposes
  const { title, color, memoryIds } = getLineInfo(line_id);

  const memories = getMemories(memoryIds);

  const isAlt = isAlternating();
  const alignment = getAlignment(isAlt);
  const lineSize = memoryIds.length;

  const isFirstMemory = (idx) => idx === 0;
  const isLastMemory = (idx) => idx === lineSize - 1;

  // TODO: useEffect to get the memoreies by line_id

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <PrivatePageHeader text={title} />
          <IconButton
            onClick={() => {
              histroy.push(`/edit-line/${line_id}`);
            }}
          >
            <EditIcon color="primary" />
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
      </div>
    </>
  );
};

export default Line;
