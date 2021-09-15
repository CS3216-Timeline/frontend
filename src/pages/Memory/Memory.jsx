import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { getMemoryById } from "../../services/memories";

const useStyles = makeStyles(() => ({
  alignCenter: {
    textAlign: "center",
  },
  descriptionStyle: {
    padding: "0% 5%",
    textAlign: "center",
  },
  imageStyle: {
    width: "90%",
    textAlign: "center",
  },
}));

const Memory = (props) => {
  const classes = useStyles();

  const { memory_id: memoryId } = useParams() 
  const { title, description, media, date } = getMemoryById(memoryId)

  const mediaUrl = media.source.url
  // const { title, description, mediaUrl, date } = props.location.state;
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
    </>
  );
};

export default Memory;
