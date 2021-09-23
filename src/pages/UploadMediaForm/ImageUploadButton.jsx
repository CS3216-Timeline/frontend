import { Button } from "@mui/material";

const inputStyle = () => ({
  display: "none",
});

// This is a hidden file input HTML element
const ImageUploadButton = (props) => {
  const { handleChange } = props;
  const { disabled } = props;

  const resetHandler = (e) => {
    e.target.value = null;
  };

  return (
    <>
      <Button
        variant="outlined"
        color={disabled ? "inherit" : "primary"}
        disabled={disabled}
        onClick={() => document.getElementById("image-upload").click()}
        fullWidth
      >
        Add Photo
      </Button>
      <input
        style={inputStyle()}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/heic"
        id="image-upload"
        onChange={handleChange}
        required
        onClick={resetHandler}
        multiple={false}
      />
    </>
  );
};

export default ImageUploadButton;
