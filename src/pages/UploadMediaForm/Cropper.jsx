import { Box, Button } from '@material-ui/core';
import { useState, useCallback } from 'react';
import ReactCrop from 'react-easy-crop';
import { COLORS } from '../../utils/colors';
import getCroppedImg from '../../utils/cropImage';

const cropperContainerStyle = () => ({
  height: "90vw",
  width:  "90vw",
  backgroundColor: COLORS.LIGHT_PURPLE,
  margin: "auto",
  padding: 0,
  position: "relative"
})

const vpWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

const containerWidth = 0.9 * vpWidth

const cropFactor = 0.8 // can adjust

const cropLength = cropFactor * containerWidth

const cropSize = { "width": cropLength, "height": cropLength }

const initCrop = () => {
  return { x: 0, y: 0, width: cropLength, height: cropLength }
}

const minZoom = 0.3

const cropAspectRatio = 1 // SQUARE

const Cropper = props => {
  // TODO: How to handle invalid photo URLS?
  // TODO: Allow BOTH videos and images 
  // TODO: In future, can allow Rotation
  // TODO: Loading state

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
          minZoom={minZoom}
          aspect={cropAspectRatio}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          restrictPosition={false}
          // zoomWithScroll={false}
        />
      </div>
      <Box>
        <Button 
        onClick={saveCroppedImage}
        color="primary"
        // Improve design
        >
          Done
        </Button>
      </Box>
    </>
  )
}

export default Cropper;