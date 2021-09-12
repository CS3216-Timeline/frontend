import { Box, Button } from "@material-ui/core";
import { useState } from "react"
import { uploadFile } from "../services/firebase"

const DEFAULT_PHOTO = "https://firebasestorage.googleapis.com/v0/b/cs3216-timeline.appspot.com/o/user-media%2Fnone.jpg?alt=media&token=658f9a1d-9f16-4ace-ad56-c9a7c0e3132e"

const inputStyle = () => ({
  display: "block",
  marginRight: "auto",
  marginLeft: "auto"
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

  return (
    <>
      {/* Just to view info */}
      <Box display="flex" flexDirection="column" style={{textAlign: "center"}}>
        <h3>Upload a photo</h3>
        <img src={url || DEFAULT_PHOTO} alt="memory preview"/>
        <h5>{file ? file.name : "No file selected"}</h5>
        <input ref={file} style={inputStyle()} type="file" accept="image/*" onChange={handleChange} />
        {uploadProgress != null && `upload progress: ${uploadProgress}%`}
        <Button onClick={handleUpload} disabled={fileIsEmpty}>Save</Button>
      </Box>
    </>
  )
}

export default UploadMediaForm;