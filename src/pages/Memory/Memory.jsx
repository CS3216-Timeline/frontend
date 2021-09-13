import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  alignCenter: {
    textAlign: "center",
  },
  descriptionStyle: {
    padding: "0% 5%",
    textAlign: "center",
  },
  imageStyle: {
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
  },
}));

const Memory = (props) => {
  const classes = useStyles();
  // const { memory_id } = useParams() // for edit purposes
  const { title, description, mediaUrl, date } = props.location.state;
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
