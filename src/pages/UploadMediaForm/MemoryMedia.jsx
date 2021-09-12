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

const MemoryMedia = props => {
  // TODO: How to handle invalid photo URLS?
  // TODO: Allow BOTH videos and images 
  const { url } = props;
  return (
    <div style={imageContainerStyle()}>
      <img style={imageStyle()} src={url} alt="memory preview"/>
    </div>
  )
}

export default MemoryMedia;