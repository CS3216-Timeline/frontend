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
  const { url, recropHandler } = props;

  const image = url ? (
    <img onClick={recropHandler} style={imageStyle()} src={url} alt="memory preview"/>
  ) : (
    <p>No Media Uploaded</p>
  );

  return (
    <div style={imageContainerStyle()}>
      {image}
    </div>
  )
}

export default MemoryMedia;