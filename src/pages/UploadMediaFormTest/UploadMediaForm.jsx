import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import HiddenFileInput from "./HiddenFileInput";
import Cropper from "./Cropper";
import MemoryMedia from "./MemoryMedia";
import { COLORS } from "../../utils/colors";
import UploadedMediaList from "./UploadedMediaList";
import DeleteMediaDialog from "./DeleteMediaDialog";

const TestUploadMediaForm = (props) => {
  const [mediaUrls, setMediaUrls] = useState([]);
  const [cropUrl, setCropUrl] = useState(null); // FINAL URL (after crop)
  const [editFileUrl, setEditFileUrl] = useState(null); // DRAFT FILE URL
  const [isCropView, setCropView] = useState(false);
  const [position, setPosition] = useState(0);
  // const [isCroppingOldMedia, setIsCroppingOldMedia] = useState(false);

  const addNewMedia = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const newFileUrl = URL.createObjectURL(newFile);
      setEditFileUrl(newFileUrl);
      setCropView(true);
    }
  };

  const deleteMediaByPosition = (positionOfMedia) => {
    let clonedMediaUrls = [...mediaUrls];
    clonedMediaUrls.splice(positionOfMedia, 1);
    // Push the position. (Damn troublesome cause this means if we delete one photo, we need to update all the photos position as well)
    clonedMediaUrls = clonedMediaUrls.map((media) => {
      return {
        ...media,
        position: clonedMediaUrls.indexOf(media),
      };
    });
    setMediaUrls(clonedMediaUrls);
    setCropUrl(null);
  };

  const handleCropDone = (cropUrl) => {
    setCropUrl(cropUrl);
    setEditFileUrl(null);
    const clonedMediaUrls = [...mediaUrls];
    // if (!isCroppingOldMedia) {
    //   setMediaUrls([
    //     ...clonedMediaUrls,
    //     {
    //       position: mediaUrls.length,
    //       cropUrl,
    //       editFileUrl,
    //     },
    //   ]);
    // } else {
    clonedMediaUrls[position] = {
      position,
      cropUrl,
      editFileUrl,
    };
    setMediaUrls(clonedMediaUrls);
    // }
    // setIsCroppingOldMedia(false);
    setCropView(false);
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
        {isCropView ? (
          <Cropper fileUrl={editFileUrl} cropHandler={handleCropDone} />
        ) : (
          <MemoryMedia
            url={cropUrl}
            hasMedia={mediaUrls.length === 0 ? false : true}
          />
        )}
        <br />
        <UploadedMediaList
          mediaUrls={mediaUrls}
          setCropView={setCropView}
          setEditFileUrl={setEditFileUrl}
          setPosition={setPosition}
          // setIsCroppingOldMedia={setIsCroppingOldMedia}
          deleteMediaByPosition={deleteMediaByPosition}
        />
        {isCropView ? (
          <Button variant="outlined" onClick={handleCancelCrop}>
            Cancel
          </Button>
        ) : (
          <Button variant="outlined" color="primary">
            <label htmlFor="file-upload">
              Add New Media (for multiple )
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
