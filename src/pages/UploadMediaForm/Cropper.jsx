import { Box, Button, makeStyles } from "@material-ui/core";
import { useState, useCallback } from "react";
import ReactCrop from "react-easy-crop";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { COLORS } from "../../utils/colors";
import { getCroppedImage } from "../../utils/cropImage";

const useStyles = makeStyles(() => ({
  cropperContainer: {
    height: "90vw",
    width: "90vw",
    maxHeight: "500px",
    maxWidth: "500px",
    backgroundColor: COLORS.LIGHT_PURPLE,
    margin: "auto",
    padding: 0,
    position: "relative",
  },
  alignCenter: {
    textAlign: "center",
  }
}));

const vpWidth = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);

const containerWidth = 0.9 * vpWidth;

const cropFactor = 0.8; // can adjust

const cropLength = cropFactor * containerWidth;

const cropSize = { width: cropLength, height: cropLength };

const initCrop = () => {
  return { x: 0, y: 0, width: cropLength, height: cropLength };
};

const minZoom = 0.3;

const cropAspectRatio = 1; // SQUARE

const Cropper = (props) => {
  const classes = useStyles();

  const { cropHandler, fileUrl } = props;
  const [crop, setCrop] = useState(initCrop());
  const [zoom, setZoom] = useState(cropFactor);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [disableDone, setDisableDone] = useState(false);

  const dispatch = useDispatch();
  const showCroppedImage = useCallback(
    async (e) => {
      setDisableDone(true);
      try {
        const croppedImage = await getCroppedImage(fileUrl, croppedAreaPixels);
        cropHandler(croppedImage);
      } catch (e) {
        dispatch(setAlert("Unable to crop image, please try again.", "error"));
        console.error(e);
        setDisableDone(false);
      }
    },
    [croppedAreaPixels, cropHandler, fileUrl, dispatch]
  );

  const saveCroppedImage = (e) => {
    e.preventDefault();
    console.log("saving cropped image");
    showCroppedImage();
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <>
      <div className={classes.cropperContainer}>
        <ReactCrop
          cropSize={cropSize}
          image={fileUrl}
          crop={crop}
          zoom={zoom}
          minZoom={minZoom}
          aspect={cropAspectRatio}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          restrictPosition={false}
          // zoomWithScroll={false}
        />
      </div>
      <br />
      <Box
        display="flex"
        flexDirection="column"
        className={classes.alignCenter}
      >
        <Button
          variant="outlined"
          onClick={saveCroppedImage}
          color={disableDone ? "inherit" : "primary"}
          disabled={disableDone}
        >
          Done
        </Button>
      </Box>
    </>
  );
};

export default Cropper;
