import { Box, Button } from '@material-ui/core';
import { useState, useCallback } from 'react';
import ReactCrop from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';

const cropperContainerStyle = () => ({
  height: "100vw",
  width:  "100vw",
  maxWidth: "500px",
  maxHeight: "500px",
  backgroundColor: "grey",
  margin: "auto",
  padding: 0,
  position: "relative"
})

const initCrop = () => {
  return { x: 0, y: 0 }
}

const Cropper = props => {
  // TODO: How to handle invalid photo URLS?
  // TODO: Allow BOTH videos and images 
  // TODO: In future, can allow Rotation

  const { file, cropHandler, } = props;
  const [crop, setCrop] = useState(initCrop())
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  // const [croppedImg, setCroppedImg] = useState(null)

  const showCroppedImage = useCallback(async e => {
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels
      )
      console.log('donee', { croppedImage })
      // setCroppedImg(croppedImage)
      cropHandler(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const saveCroppedImage = e => {
    e.preventDefault()
    showCroppedImage() 
  }

  const onCropChange = (crop) => {
    setCrop(crop)
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <>
      <div style={cropperContainerStyle()}>
        <ReactCrop 
          // cropSize={{width: "80%", height: "80%"}} // need to adjust later on
          image={URL.createObjectURL(file)} 
          crop={crop}
          zoom={zoom}
          minZoom={0.3}
          aspect={1}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          restrictPosition={false}
          // zoomWithScroll={false}
          // zoomSpeed={0.7}
        />
      </div>
      <Box>
        <Button 
        onClick={saveCroppedImage}
        // Improve design
        >
          Confirm Crop
        </Button>
      </Box>
      {/* Uncomment below to preview cropped image */}
      {/* <div style={cropperContainerStyle()}>
        {croppedImg && <img width="100%" src={croppedImg} />}
      </div> */}
    </>
  )
}

export default Cropper;