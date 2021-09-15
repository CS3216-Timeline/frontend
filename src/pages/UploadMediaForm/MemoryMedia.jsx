import { COLORS } from "../../utils/colors";

const imageStyle = () => ({
  objectFit: "contain",
  width: "100%",
  height: "100%"
})

const imageContainerStyle = () => ({
  height: "90vw",
  width:  "90vw",
  maxHeight: "500px",
  maxWidth: "500px",
  backgroundColor: COLORS.LIGHT_PURPLE,
  margin: "auto",
})

const MemoryMedia = props => {
  // TODO: How to handle invalid photo URLS?
  // TODO: Allow BOTH videos and images 
  const { url } = props;

  return (
    <div style={imageContainerStyle()}>
      { url && <img style={imageStyle()} src={url} alt="memory preview"/> }
      { !url && <p>No Media Uploaded</p> }
    </div>
  )
}

export default MemoryMedia;