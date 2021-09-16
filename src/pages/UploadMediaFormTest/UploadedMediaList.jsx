import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import UploadedMediaItem from "./UploadedMediaItem";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const UploadedMediaList = ({
  mediaUrls,
  setCropView,
  setEditFileUrl,
  setPosition,
  setIsCroppingOldMedia,
  deleteMediaByPosition,
}) => {
  const classes = useStyles();
  const sortedMediaUrls = mediaUrls.sort((a, b) => {
    return a.position - b.position;
  });

  return (
    <>
      <Grid container className={classes.root}>
        {sortedMediaUrls.map((media) => (
          <UploadedMediaItem
            key={media.position}
            media={media}
            setEditFileUrl={setEditFileUrl}
            setCropView={setCropView}
            setPosition={setPosition}
            setIsCroppingOldMedia={setIsCroppingOldMedia}
            deleteMediaByPosition={deleteMediaByPosition}
          />
        ))}
      </Grid>
    </>
  );
};

export default UploadedMediaList;
