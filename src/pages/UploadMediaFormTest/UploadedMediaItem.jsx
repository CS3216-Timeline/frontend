import React, { useState } from "react";
import { makeStyles, Grid, Box, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { COLORS } from "../../utils/colors";
import DeleteMediaDialog from "./DeleteMediaDialog";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.3, 0),
  },
  iconStyle: {
    fontSize: "16px",
    backgroundColor: COLORS.WHITE,
    borderRadius: "50%",
    border: `3px solid ${COLORS.LIGHT_GREY}`,
  },
  editButtonContainer: {
    position: "absolute",
    top: "-20px",
    right: "-2px",
    "@media (max-width: 480px)": {
      right: "-15px",
    },
  },
  deleteButtonContainer: {
    position: "absolute",
    bottom: "-20px",
    right: "-2px",
    "@media (max-width: 480px)": {
      right: "-15px",
    },
  },
  image: {
    width: "80%",
    height: "auto",
    border: `3px solid ${COLORS.PRIMARY_PURPLE}`,
    borderRadius: "10%",
  },
}));

const UploadedMediaItem = ({
  media,
  setCropView,
  setEditFileUrl,
  setPosition,
  setIsCroppingOldMedia,
  deleteMediaByPosition,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);

  const onEditButtonClicked = () => {
    setIsCroppingOldMedia(true);
    setCropView(true);
    setEditFileUrl(media.editFileUrl);
    setPosition(media.position);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid item xs={4} className={classes.root}>
          <Box position="relative">
            <Box className={classes.editButtonContainer}>
              <IconButton onClick={onEditButtonClicked}>
                <EditIcon className={classes.iconStyle} />
              </IconButton>
            </Box>
            <Box className={classes.deleteButtonContainer}>
              <IconButton onClick={() => setDisplayDeleteDialog(true)}>
                <DeleteIcon className={classes.iconStyle} />
              </IconButton>
            </Box>
            <img className={classes.image} src={media.cropUrl} alt={"test"} />
          </Box>
        </Grid>
      )}
      <DeleteMediaDialog
        setLoading={setLoading}
        displayDeleteDialog={displayDeleteDialog}
        setDisplayDeleteDialog={setDisplayDeleteDialog}
        deleteMediaByPosition={deleteMediaByPosition}
        mediaPosition={media.position}
      />
    </>
  );
};

export default UploadedMediaItem;
