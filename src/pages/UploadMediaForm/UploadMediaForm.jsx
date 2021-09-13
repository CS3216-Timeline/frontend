import { Box, Button } from "@material-ui/core";
import { useEffect, useState } from "react"
import HiddenFileInput from "./HiddenFileInput";
import Cropper from "./Cropper";
import MemoryMedia from "./MemoryMedia";
import { COLORS } from "../../utils/colors";

const UploadMediaForm = props => {
  const { doneHandler } = props;
  const [fileUrl, setFileUrl] = useState(null); // FINAL URL (before crop)
  const [cropUrl, setCropUrl] = useState(null); // FINAL URL (after crop)
  const [editFileUrl, setEditFileUrl] = useState(null); // DRAFT FILE URL
  const [isCropView, setCropView] = useState(false);

  useEffect(() => {
    if (cropUrl) {
      doneHandler(cropUrl)
    }
  }, [doneHandler, cropUrl]);

  const handleChange = e => {
    const newFile = e.target.files[0];
    if (newFile) {
      console.log(newFile) // TODO: Remove
      const newFileUrl = URL.createObjectURL(newFile)
      setEditFileUrl(newFileUrl);
      setCropView(true);
    }
  }

  const handleCropDone = cropUrl => {
    setCropUrl(cropUrl);
    setFileUrl(editFileUrl);
    setEditFileUrl(null);
    setCropView(false);
  }

  const handleRepeatCrop = (e) => {
    e.preventDefault()
    setEditFileUrl(fileUrl);
    setCropView(true);
  }

  const hasValidMedia = cropUrl !== null

  const handleCancelCrop = (e) => {
    e.preventDefault()
    setEditFileUrl(null);
    setCropView(false);
  }

  if (isCropView) {
    return (
      <Box display="flex" flexDirection="column" style={{textAlign: "center"}}>
        <h3 style={{color: COLORS.PRIMARY_PURPLE}}>Upload Media</h3>
        <Cropper fileUrl={editFileUrl} cropHandler={handleCropDone} />
        <Button onClick={handleCancelCrop}>Cancel</Button>
        <br />
        {/* <h5>[TEST] Final URL: {cropUrl ? cropUrl : "No Image Uploaded"}</h5> */}
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" style={{textAlign: "center"}}>
      <h3 style={{color: COLORS.PRIMARY_PURPLE}}>Upload Media</h3>
      <MemoryMedia url={cropUrl} />
      {fileUrl && <Button onClick={handleRepeatCrop}>Crop</Button>}
      <br />
      <Button
        color="primary"
      >
      <label htmlFor="file-upload" class="custom-file-upload">
        {hasValidMedia ? "Change" : "Add New"} Media
        <HiddenFileInput handleChange={handleChange} />
      </label>
      </Button>
      {/* <h5>[TEST] Final URL: {cropUrl}</h5> */}
    </Box>
  )
}

export default UploadMediaForm;