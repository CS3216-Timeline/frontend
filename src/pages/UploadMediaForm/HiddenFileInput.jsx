const inputStyle = () => ({
  display:"none"
})

// This is a hidden file input HTML element
const HiddenFileInput = props => {
  const { handleChange } = props
  return (
    <input 
      // ref={file}
      style={inputStyle()} 
      type="file" 
      accept="image/*" 
      id="file-upload"
      onChange={handleChange} 
      required
    />
  )
}

export default HiddenFileInput;