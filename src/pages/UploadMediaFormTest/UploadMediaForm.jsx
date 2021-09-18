import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import HiddenFileInput from "./HiddenFileInput";
import Cropper from "./Cropper";
import MemoryMedia from "./MemoryMedia";
import { COLORS } from "../../utils/colors";
import UploadedMediaList from "./UploadedMediaList";
import DeleteMediaDialog from "./DeleteMediaDialog";

const MEDIA_LIMIT = 3; // can tweak

const TestUploadMediaForm = (props) => {
  const [mediaUrls, setMediaUrls] = useState([]); // FINAL URLs
  const [editFileUrl, setEditFileUrl] = useState(null); // DRAFT FILE URL
  const [isCropView, setCropView] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  console.log(mediaUrls);

  const addNewMedia = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const newFileUrl = URL.createObjectURL(newFile);
      setEditFileUrl(newFileUrl);
      setCropView(true);
    }
  };

  const setMediaPreview = (positionOfMedia) => {
    console.log(positionOfMedia);
    if (positionOfMedia >= mediaUrls.length) {
      return;
    }
    setPreviewUrl(mediaUrls[positionOfMedia].cropUrl);
  }

  const isMediaLimitReached = () => {
    return mediaUrls.length === MEDIA_LIMIT;
  }

  const deleteMediaByPosition = (positionOfMedia) => {
    let clonedMediaUrls = [...mediaUrls];
    if (previewUrl === clonedMediaUrls[positionOfMedia].cropUrl) {
      setPreviewUrl(null);
    }
    clonedMediaUrls.splice(positionOfMedia, 1);
    // Push the position. (Damn troublesome cause this means if we delete one photo, we need to update all the photos position as well)
    clonedMediaUrls = clonedMediaUrls.map((media) => {
      return {
        ...media,
        position: clonedMediaUrls.indexOf(media),
      };
    });
    setMediaUrls(clonedMediaUrls);
  };

  const handleCropDone = (cropUrl) => {
    setEditFileUrl(null);
    const clonedMediaUrls = [...mediaUrls];
    setMediaUrls([
      ...clonedMediaUrls,
      {
        position: mediaUrls.length,
        cropUrl: cropUrl,
      },
    ]);
    setCropView(false);
    setPreviewUrl(cropUrl);
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
        marginBottom={12}
      >
        <h3 style={{ color: COLORS.PRIMARY_PURPLE }}>Upload Media</h3>
        <p>You may add up to 3 photos!</p>
        {isCropView ? (
          <Cropper fileUrl={editFileUrl} cropHandler={handleCropDone} />
        ) : (
          <MemoryMedia
            url={previewUrl}
            hasMedia={mediaUrls.length === 0 ? false : true}
          />
        )}
        <br />
        <UploadedMediaList
          mediaUrls={mediaUrls}
          setCropView={setCropView}
          setEditFileUrl={setEditFileUrl}
          setMediaPreview={setMediaPreview}
          deleteMediaByPosition={deleteMediaByPosition}
          selectedMediaUrl={previewUrl}
          hide={isCropView}
        />
        {isCropView ? (
          <Button variant="outlined" onClick={handleCancelCrop}>
            Cancel
          </Button>
        ) : (
          <Button 
            variant="outlined" 
            color="primary"
            disabled={isMediaLimitReached()}
          >
            <label htmlFor="file-upload">
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

export default TestUploadMediaForm;
