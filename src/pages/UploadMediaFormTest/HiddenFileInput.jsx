const inputStyle = () => ({
  display: "none",
});

// This is a hidden file input HTML element
const HiddenFileInput = (props) => {
  const { handleChange } = props;

  const resetHandler = (e) => {
    e.target.value = null;
  };

  return (
    <input
      // ref={file}
      style={inputStyle()}
      type="file"
      accept="image/*"
      id="file-upload"
      onChange={handleChange}
      required
      onClick={resetHandler}
    />
  );
};

export default HiddenFileInput;
