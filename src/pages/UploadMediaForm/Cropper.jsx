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



const vpWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

const cropFactor = 0.8 // can adjust

const cropLength = cropFactor * vpWidth

const cropSize = { "width": cropLength, "height": cropLength }

const initCrop = () => {
  return { x: 0, y: 0, width: cropLength, height: cropLength }
}

const Cropper = props => {
  // TODO: How to handle invalid photo URLS?
  // TODO: Allow BOTH videos and images 
  // TODO: In future, can allow Rotation

  const { cropHandler, fileUrl } = props;
  const [crop, setCrop] = useState(initCrop())
  const [zoom, setZoom] = useState(cropFactor)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const showCroppedImage = useCallback(async e => {
    try {
      const croppedImage = await getCroppedImg(
        fileUrl,
        croppedAreaPixels
      )
      console.log('donee', { croppedImage })
      cropHandler(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, cropHandler, fileUrl])

  const saveCroppedImage = (e) => {
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
          cropSize={cropSize}
          image={fileUrl} 
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
    </>
  )
}

export default Cropper;