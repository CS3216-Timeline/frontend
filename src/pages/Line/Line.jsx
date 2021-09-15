import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import { getLineById } from "../../services/lines";
import { getMemoryById } from "../../services/memories"
import LineCard from "./LineCard";
// import { useParams } from 'react-router-dom';

const getLineInfo = (id) => getLineById(id);
const getMemories = (memoryIds) => memoryIds.map((id) => getMemoryById(id));

const getLineStyle = () => {
  // if mobile, {}
  // return { padding: "50px 400px", }
};

const getLineTitleStyle = () => ({
  textAlign: "center",
  padding: "0 ",
});

const isAlternating = () => {
  // if desktop, return true
  return false;
};

const getAlignment = (isAlternating) => {
  // if desktop, return "alternate"
  return isAlternating ? "alternate" : "left";
};

const Line = (props) => {
  const { lineId } = props;
  // const { line_id } = useParams() // for edit purposes
  const { title, color, memoryIds } = getLineInfo(lineId);

  const memories = getMemories(memoryIds);

  const isAlt = isAlternating();
  const alignment = getAlignment(isAlt);
  const lineSize = memoryIds.length;

  const isFirstMemory = (idx) => idx === 0;
  const isLastMemory = (idx) => idx === lineSize - 1;
  return (
    <>
      <div style={getLineStyle()}>
        <h1 style={getLineTitleStyle()}>{title}</h1>
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
