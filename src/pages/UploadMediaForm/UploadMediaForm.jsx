import { Box, Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import HiddenFileInput from "./HiddenFileInput";
import Cropper from "./Cropper";
import MemoryMedia from "./MemoryMedia";
import { COLORS } from "../../utils/colors";
import { createNewMedia, deleteMediaById } from "../../services/media";
import UploadedMediaList from "./UploadedMediaList";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";

const heic2any = require("heic2any");

const MEDIA_LIMIT = 4; // can tweak
const MEGABYTE = 1048576;
const MAX_FILE_SIZE = 10 * MEGABYTE;

const useStyles = makeStyles((theme) => ({
  formContainer: { 
    textAlign: "center",
  },
  formTitle: {
    color: COLORS.PRIMARY_PURPLE,
  },
}));

const UploadMediaForm = ({ memoryId, existingMediaUrls, onComplete }) => {
  const classes = useStyles();

  const initUrls = existingMediaUrls
    ? existingMediaUrls.map((media) => ({ ...media }))
    : [];
  const [mediaUrls, setMediaUrls] = useState(initUrls); // FINAL URLs
  const [editFileUrl, setEditFileUrl] = useState(null); // DRAFT FILE URL
  const [isCropView, setCropView] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();

  const loadImage = (file) => {
    setImageLoading(true);
    setCropView(false);
    let fileUrl = URL.createObjectURL(file);
    setEditFileUrl(null);
    fetch(fileUrl)
      .then((res) => res.blob())
      .then((blob) => heic2any({ blob }))
      .then((res) => {
        fileUrl = URL.createObjectURL(res);
      })
      .catch((e) => {
        // do nothing
      })
      .finally(() => {
        setImageLoading(false);
        if (fileUrl) {
          setEditFileUrl(fileUrl);
          setCropView(true);
        } else {
          dispatch(
            setAlert("Only PNG, JPEG, HEIC images are accepted!", "error")
          );
          setCropView(false);
        }
      });
  };

  const addNewMedia = (e) => {
    e.preventDefault();
    let newFile = e.target.files[0];
    if (!newFile) {
      return;
    }
    if (newFile.size > MAX_FILE_SIZE) {
      dispatch(setAlert("Image file should not exceed 10MB.", "error"));
      return;
    }
    loadImage(newFile);
  };

  const setMediaPreview = (positionOfMedia) => {
    if (positionOfMedia >= mediaUrls.length) {
      return;
    }
    setPreviewUrl(mediaUrls[positionOfMedia].url);
  };

  const isMediaLimitReached = () => {
    return mediaUrls.length === MEDIA_LIMIT;
  };

  const deleteMediaByPosition = async (positionOfMedia) => {
    console.log("deleting media at position", positionOfMedia);
    if (previewUrl === mediaUrls[positionOfMedia].url) {
      setPreviewUrl(null);
    }
    let deleteId = null;
    // update positions
    const clonedMediaUrls = [...mediaUrls]
      .filter((media, idx) => {
        if (idx === positionOfMedia) {
          deleteId = media.mediaId;
          return false;
        }
        return true;
      })
      .map((media, idx) => {
        return {
          ...media,
          position: idx,
        };
      });
    if (deleteId) {
      await deleteMediaById(deleteId);
    }
    setMediaUrls([...clonedMediaUrls]);
  };

  useEffect(() => {
    if (onComplete) {
      onComplete([...mediaUrls]);
    }
  }, [mediaUrls, onComplete]);

  const handleCropDone = (url) => {
    setEditFileUrl(null);
    const clonedMediaUrls = [...mediaUrls];
    const newMedia = {
      position: clonedMediaUrls.length,
      url,
    };
    if (!memoryId) {
      setMediaUrls([...clonedMediaUrls, newMedia]);
      setCropView(false);
      setPreviewUrl(newMedia.url);
      return;
    }
    console.log(newMedia.position);
    const addMedia = async () => {
      setLoading(true);
      setCropView(false);
      try {
        const createdMedia = await createNewMedia({ ...newMedia }, memoryId);
        setMediaUrls([...createdMedia]);
        setPreviewUrl(createdMedia.url);
        dispatch(setAlert("Media has been added!", "success"));
      } catch (e) {
        dispatch(setAlert("Unable to add media. (302)", "error"));
      } finally {
        setLoading(false);
      }
    };
    addMedia();
  };

  const handleCancelCrop = (e) => {
    e.preventDefault();
    setEditFileUrl(null);
    setCropView(false);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        className={classes.formContainer}
      >
        <h3 className={classes.formTitle}>Upload Media</h3>
        <p>Please upload 1 - {MEDIA_LIMIT} photos.</p>
        {isCropView ? (
          <Cropper fileUrl={editFileUrl} cropHandler={handleCropDone} />
        ) : (
          <MemoryMedia
            loading={imageLoading}
            url={previewUrl}
            hasMedia={mediaUrls.length === 0 ? false : true}
          />
        )}
        <br />
        {!isCropView && (
          <UploadedMediaList
            mediaUrls={mediaUrls}
            setCropView={setCropView}
            setEditFileUrl={setEditFileUrl}
            setMediaPreview={setMediaPreview}
            deleteMediaByPosition={deleteMediaByPosition}
            selectedMediaUrl={previewUrl}
          />
        )}
        {isCropView ? (
          <Button
            variant="outlined"
            onClick={handleCancelCrop}
            disabled={loading}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            color={loading || isMediaLimitReached() ? "inherit" : "primary"}
            disabled={loading || isMediaLimitReached()}
          >
            <label htmlFor="image-upload">
              Add New Media
              <HiddenFileInput handleChange={addNewMedia} />
            </label>
          </Button>
        )}
      </Box>
    </>
  );
};

export default UploadMediaForm;
