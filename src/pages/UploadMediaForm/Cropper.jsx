import { Box, Button } from "@material-ui/core";
import { useState, useCallback } from "react";
import ReactCrop from "react-easy-crop";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { setAlert } from "../../actions/alert";
import { COLORS } from "../../utils/colors";
import { getCroppedImage } from "../../utils/cropImage";

const cropperContainerStyle = () => ({
  height: "90vw",
  width: "90vw",
  maxHeight: "500px",
  maxWidth: "500px",
  backgroundColor: COLORS.LIGHT_PURPLE,
  margin: "auto",
  padding: 0,
  position: "relative",
});

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
  // TODO: How to handle invalid photo URLS?
  // TODO: Allow BOTH videos and images
  // TODO: In future, can allow Rotation
  // TODO: Loading state

  const { cropHandler, fileUrl } = props;
  const [crop, setCrop] = useState(initCrop());
  const [zoom, setZoom] = useState(cropFactor);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [disableDone, setDisableDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const showCroppedImage = useCallback(
    async (e) => {
      setLoading(true);
      setDisableDone(true);
      try {
        const croppedImage = await getCroppedImage(fileUrl, croppedAreaPixels);
        setLoading(false);
        cropHandler(croppedImage);
      } catch (e) {
        dispatch(setAlert("Unable to crop image, please try again.", "error"));
        console.error(e);
        setDisableDone(false);
        setLoading(false);
        cropHandler(null);
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

  if (loading) {
    return (
      <div style={cropperContainerStyle()}>
        <p>Loading image...</p>
        <ClipLoader color={COLORS.PRIMARY_PURPLE} loading={true} size={50} />
      </div>
    )
  }

  return (
    <>
      <div style={cropperContainerStyle()}>
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
        style={{ textAlign: "center" }}
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
