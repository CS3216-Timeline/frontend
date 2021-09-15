import React from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, makeStyles } from "@material-ui/core";
import { COLORS } from "../../utils/colors";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { deleteMemoryById } from "../../services/memories";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  cancelButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.CANCEL_BUTTON,
  },
  deleteButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.SUCCESS_BUTTON,
  },
}));

const DeleteMemoryDialog = ({
  setLoading,
  displayDeleteDialog,
  setDisplayDeleteDialog,
  memoryId,
  lineId,
  setDeleted,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteMemory = async () => {
    try {
      setLoading(true);
      await deleteMemoryById(memoryId);
      setDisplayDeleteDialog(false);
      dispatch(setAlert("Successfully deleted memory", "success"));
      setDeleted(true);
    } catch (err) {
      dispatch(setAlert(err.message, "error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={displayDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setDisplayDeleteDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure you want to delete this line?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You will not be able to retrieve the memory back after deleting it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDisplayDeleteDialog(false)}
            color="primary"
            className={classes.cancelButton}
          >
            No
          </Button>
          <Button
            onClick={deleteMemory}
            color="primary"
            className={classes.deleteButton}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteMemoryDialog;
