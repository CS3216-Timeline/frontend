import { Box, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import HiddenFileInput from "./HiddenFileInput";
import Cropper from "./Cropper";
import MemoryMedia from "./MemoryMedia";
import { COLORS } from "../../utils/colors";
import { createNewMedia, deleteMediaById } from "../../services/media";
import UploadedMediaList from "./UploadedMediaList";
import DeleteMediaDialog from "./DeleteMediaDialog";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";

const heic2any = require("heic2any");

const MEDIA_LIMIT = 4; // can tweak
const MEGABYTE = 1048576;
const MAX_FILE_SIZE = 10 * MEGABYTE;

const UploadMediaForm = ({ memoryId, existingMediaUrls, onComplete }) => {
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
    var fileUrl = URL.createObjectURL(file);
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
    var newFile = e.target.files[0];
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

  // deletion logic
  const deleteMedia = async (mediaId, clonedMediaUrls) => {
    setLoading(true);
    try {
      await deleteMediaById(mediaId);
      setMediaUrls([...clonedMediaUrls]);
    } catch(e) {
      console.log(e.message);
      dispatch(setAlert("Unable to delete media", "error"));
    } finally {
      setLoading(false);
    }
  };

  const deleteMediaByPosition = (positionOfMedia) => {
    console.log("deleting media at position", positionOfMedia)
    if (previewUrl === mediaUrls[positionOfMedia].url) {
      setPreviewUrl(null);
    }
    var deleteId = -1;
    // update positions
    const clonedMediaUrls = [...mediaUrls].filter((media, idx) => {
      if (idx === positionOfMedia) {
        deleteId = media.mediaId;
        return false;
      }
      return true;
    }).map((media, idx) => {
      return {
        ...media,
        position: idx,
      };
    });
    if (!memoryId) {
      setMediaUrls([...clonedMediaUrls]);
      return;
    }
    if ((deleteId !== -1 && deleteId) || deleteId === 0) {
      deleteMedia(deleteId, clonedMediaUrls);
    }
  };

  useEffect(() => {
    if (onComplete) {
      onComplete([...mediaUrls]);
    }
  }, [mediaUrls, onComplete]);

  console.log(mediaUrls);
  const handleCropDone = (url) => {
    setEditFileUrl(null);
    const clonedMediaUrls = [...mediaUrls];
    const newMedia = {
      position: clonedMediaUrls.length,
      url,
    };
    if (!memoryId) {
      setMediaUrls([
        ...clonedMediaUrls,
        newMedia
      ]);
      setCropView(false);
      setPreviewUrl(newMedia.url);
      return;
    }
    console.log(newMedia.position);
    const addMedia = async () => {
      setLoading(true);
      setCropView(false);
      try {
        const createdMedia = await createNewMedia({...newMedia}, memoryId);
        setMediaUrls([...createdMedia]);
        setPreviewUrl(createdMedia.url);
      } catch(e) {
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
        style={{ textAlign: "center" }}
        // marginBottom={12}
      >
        <h3 style={{ color: COLORS.PRIMARY_PURPLE }}>Upload Media</h3>
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
          <Button variant="outlined" onClick={handleCancelCrop}>
            Cancel
          </Button>
        ) : (
          <Button
            variant="outlined"
            color={loading ? "inherit" : "primary"}
            disabled={loading || isMediaLimitReached()}
          >
            <label htmlFor="image-upload">
              Add New Media
              <HiddenFileInput handleChange={addNewMedia} />
            </label>
          </Button>
        )}
      </Box>
      <DeleteMediaDialog />
    </>
  );
};

export default UploadMediaForm;
