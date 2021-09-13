import { Box, Button } from "@material-ui/core";
import { useState } from "react"
import HiddenFileInput from "./HiddenFileInput";
import Cropper from "./Cropper";
import MemoryMedia from "./MemoryMedia";

const UploadMediaForm = props => {
  const { memory_id } = props;
  const [file, setFile] = useState(null); // uploaded raw image
  const [url, setUrl] = useState(null); // URL of uploaded raw image
  const [cropUrl, setCropUrl] = useState(null); // URL of cropped image

  const handleChange = e => {
    const newFile = e.target.files[0];
    if (newFile === file) {
      return;
    }
    if (newFile) {
      console.log(newFile)
      setFile(newFile);
      setUrl(URL.createObjectURL(newFile));
      setCropUrl(null);
    }
  }

  const handleCrop = cropUrl => {
    setCropUrl(cropUrl);
  }

  const fileIsEmpty = file === null
  
  const handleUpload = () => {
    console.log("TODO: Send media to server")
  }

  const showCrop = file && !cropUrl;

  return (
    <>
      <Box display="flex" flexDirection="column" style={{textAlign: "center"}}>
        <h3>Upload a photo</h3>
        {!showCrop && <MemoryMedia url={cropUrl} />}
        {showCrop && <Cropper file={file} url={url} cropHandler={handleCrop} />}
        <br />
        <label htmlFor="file-upload" class="custom-file-upload">
          {file ? "Change" : "New"} Photo
          <HiddenFileInput handleChange={handleChange} />
        </label>
        {/* Info displayed for testing purposes */}
        <h5>[TEST] File Name: {file ? file.name : "No file selected"}</h5>
        <h5>[TEST] URL: {url ? url : ""}</h5>
        <Button onClick={handleUpload} disabled={fileIsEmpty}>Save</Button>
      </Box>
    </>
  )
}

export default UploadMediaForm;