import { Box, Button, Input } from "@material-ui/core";
import { memo, useState } from "react"
import { Redirect } from "react-router";
import { storage } from "../services/firebase"
import { postMediaUrl } from "../services/media";

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
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = e => {
    const newFile = e.target.files[0];
    console.log(newFile)
    if (newFile == file) {
      return;
    }
    if (newFile) {
      console.log(newFile)
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  const fileIsEmpty = file === null

  const handleUpload = () => {
    const uploadTask = storage.ref(`user-media/${memory_id}/${file.name}`).put(file)
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setUploadProgress(progress)
      }, 
      error => {
        // TODO: show an alert
        console.log("set up error alert here!");
        setUploadProgress(0);
        setFile(null);
      },
      () => {
        storage
          .ref("user-media")
          .child(`${memory_id}/${file.name}`)
          .getDownloadURL()
          .then(url => {
            postMediaUrl(url, memory_id);
            setUrl(url);
          });
      }
    )
  }

  return (
    <>
      {/* Just to view info */}
      <Box display="flex" flexDirection="column" style={{textAlign: "center"}}>
        <h3>Upload a photo</h3>
        <img src={url || DEFAULT_PHOTO} alt="memory photo preview"/>
        <h5>{file ? file.name : "No file selected"}</h5>
        <input ref={file} style={inputStyle()} type="file" accept="image/*" onChange={handleChange} />
        upload progress: {uploadProgress}%
        <Button onClick={handleUpload} disabled={fileIsEmpty}>Upload</Button>
      </Box>
    </>
  )
}

export default UploadMediaForm;