import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  hiddenInput: {
    display: "none",
  }
}))

// This is a hidden file input HTML element
const HiddenFileInput = (props) => {
  const classes = useStyles();
  const { handleChange } = props;

  const resetHandler = (e) => {
    e.target.value = null;
  };

  return (
    <input
      className={classes.hiddenInput}
      type="file"
      accept="image/jpeg, image/jpg, image/png, image/heic"
      id="image-upload"
      onChange={handleChange}
      required
      onClick={resetHandler}
      multiple={false}
    />
  );
};

export default HiddenFileInput;
