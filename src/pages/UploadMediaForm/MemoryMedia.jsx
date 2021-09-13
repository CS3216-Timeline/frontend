import { COLORS } from "../../utils/colors";

const imageStyle = () => ({
  objectFit: "contain",
  width: "100%",
  height: "100%"
})

const imageContainerStyle = () => ({
  height: "90vw",
  width:  "90vw",
  backgroundColor: COLORS.LIGHT_PURPLE,
  margin: "auto",
  display: "inline-block",
  verticalAlign: "middle"
})

const MemoryMedia = props => {
  // TODO: How to handle invalid photo URLS?
  // TODO: Allow BOTH videos and images 
  const { url, recropHandler } = props;

  return (
    <div style={imageContainerStyle()}>
      { url && <img onClick={recropHandler} style={imageStyle()} src={url} alt="memory preview"/> }
      { !url && <p>No Media Uploaded</p> }
    </div>
  )
}

export default MemoryMedia;