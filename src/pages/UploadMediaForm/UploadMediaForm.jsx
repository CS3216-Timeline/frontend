import { Box, Button } from "@material-ui/core";
import { useState } from "react"
import HiddenFileInput from "./HiddenFileInput";
import Cropper from "./Cropper";
import MemoryMedia from "./MemoryMedia";

const UploadMediaForm = props => {
  const { memory_id } = props;
  const [fileUrl, setFileUrl] = useState(null); // FINAL URL (before crop)
  const [cropUrl, setCropUrl] = useState(null); // FINAL URL (after crop)
  const [editFileUrl, setEditFileUrl] = useState(null); // DRAFT FILE URL
  const [isCropView, setCropView] = useState(false);

  const handleChange = e => {
    const newFile = e.target.files[0];
    if (newFile) {
      console.log(newFile) // TODO: Remove
      const newFileUrl = URL.createObjectURL(newFile)
      setEditFileUrl(newFileUrl);
      setCropView(true);
    }
  }

  const handleCrop = cropUrl => {
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
  
  const handleUpload = () => {
    console.log("TODO: Send media to server")
  }

  return (
    <>
      <Box display="flex" flexDirection="column" style={{textAlign: "center"}}>
        <h3>Upload a photo</h3>
        {!isCropView && <MemoryMedia url={cropUrl} />}
        {isCropView && <Cropper fileUrl={editFileUrl} cropHandler={handleCrop} />}
        <div>
          {isCropView && <Button onClick={handleCancelCrop}>Cancel</Button>}
          {!isCropView && <Button onClick={handleRepeatCrop}>Crop</Button>}
        </div>
        <br />
        <label htmlFor="file-upload" class="custom-file-upload">
          {hasValidMedia ? "Change" : "New"} Photo
          <HiddenFileInput handleChange={handleChange} />
        </label>
        <h5>[TEST] Final URL: {cropUrl ? cropUrl : "No Image Uploaded"}</h5>
        <Button onClick={handleUpload} disabled={!hasValidMedia}>Save</Button>
      </Box>
    </>
  )
}

export default UploadMediaForm;