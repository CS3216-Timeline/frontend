import { Box } from "@material-ui/core";
import React, { Fragment } from "react";

const alignCenter = () => ({
  textAlign: "center",
});

const imageStyle = () => ({
  maxWidth: "500px",
  width: "90%",
  textAlign: "center",
});

const descriptionStyle = () => ({
  padding: "0% 5%",
  textAlign: "center",
});

const Memory = (props) => {
  // const { memory_id } = useParams() // for edit purposes
  const { title, description, mediaUrl, date } = props.location.state;
  return (
    <>
      <Box style={alignCenter()}>
        <h1>{title}</h1>
        <img alt={title} style={imageStyle()} src={mediaUrl} />
        <h4>{date}</h4>
        <div style={descriptionStyle()}>
          <p>{description}</p>
        </div>
      </Box>
    </>
  );
};

export default Memory;
