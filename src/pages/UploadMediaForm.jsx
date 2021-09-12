import { Box, Button } from "@material-ui/core";
import { useState } from "react"
import { uploadFile } from "../services/firebase"

const DEFAULT_PHOTO = "https://firebasestorage.googleapis.com/v0/b/cs3216-timeline.appspot.com/o/user-media%2Fnone.jpg?alt=media&token=658f9a1d-9f16-4ace-ad56-c9a7c0e3132e"

const inputStyle = () => ({
  display:"none"
})

const imageStyle = () => ({
  objectFit: "contain",
  width: "100%",
  height: "100%"
})

const imageContainerStyle = () => ({
  height: "100vw",
  width:  "100vw",
  maxWidth: "500px",
  maxHeight: "500px",
  backgroundColor: "grey",
  margin: "auto"
})

const UploadMediaForm = props => {
  const { memory_id } = props;
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleChange = e => {
    const newFile = e.target.files[0];
    if (newFile === file) {
      return;
    }
    if (newFile) {
      console.log(newFile)
      setFile(newFile);
      setUrl(URL.createObjectURL(newFile));
    }
  }

  const fileIsEmpty = file === null

  const progressHandler = (percentage) => {
    setUploadProgress(percentage);
  }

  const errorHandler = () => {
    // TODO: show an alert
    console.log("set up error alert here!");
    setUploadProgress(null);
    setFile(null);
    setUrl(null);
  }

  const successHandler = (url) => {
    setUrl(url);
    setUploadProgress(null);
    setFile(null);
  }
  
  const handleUpload = () => {
    uploadFile(file, file.name, memory_id, progressHandler, errorHandler, successHandler);
  }

  const hiddenInputElement = (
    <input 
      ref={file} 
      style={inputStyle()} 
      type="file" 
      accept="image/*" 
      id="file-upload"
      onChange={handleChange} 
      required
    />
  )

  return (
    <>
      <Box display="flex" flexDirection="column" style={{textAlign: "center"}}>
        <h3>Upload a photo</h3>
        <div style={imageContainerStyle()}>
          <img style={imageStyle()} src={url || DEFAULT_PHOTO} alt="memory preview"/>
        </div>
        <br />
        <label for="file-upload" class="custom-file-upload">
          {hiddenInputElement}
          Click to add or replace photo
        </label>
        {uploadProgress !== null && `upload progress: ${uploadProgress}%`}
        {/* Info displayed for testing purposes */}
        <h5>[TEST] File Name: {file ? file.name : "No file selected"}</h5>
        <h5>[TEST] URL: {url ? url : ""}</h5>
        <Button onClick={handleUpload} disabled={fileIsEmpty}>Save</Button>
      </Box>
    </>
  )
}

export default UploadMediaForm;