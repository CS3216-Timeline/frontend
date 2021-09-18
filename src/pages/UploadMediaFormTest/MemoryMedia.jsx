import { makeStyles } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

const useStyles = makeStyles((theme) => ({
  imageStyle: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  imageContainerStyle: {
    height: "90vw",
    width: "90vw",
    maxHeight: "500px",
    maxWidth: "500px",
    backgroundColor: COLORS.LIGHT_PURPLE,
    margin: "auto",
  },
}));

const MemoryMedia = (props) => {
  const classes = useStyles();
  // TODO: How to handle invalid photo URLS?
  // TODO: Allow BOTH videos and images
  const { url, hasMedia } = props;

  return (
    <div className={classes.imageContainerStyle}>
      {url && (
        <img className={classes.imageStyle} src={url} alt="memory preview" />
      )}
      {!url && !hasMedia && <p>No Media Selected</p>}
      {!url && hasMedia && <p>Choose a photo to edit</p>}
    </div>
  );
};

export default MemoryMedia;
