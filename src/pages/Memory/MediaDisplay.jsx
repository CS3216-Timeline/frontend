import { makeStyles } from "@material-ui/core";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const vpWidth = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);

const containerWidth = vpWidth * 0.9;
const IMG_WIDTH = containerWidth;
// const IMG_HEIGHT = containerWidth;

const useStyles = makeStyles((theme) => ({
  swiper: {
    display: "flex",
    overflowX: "visible",
    transitionProperty: "transform",
    willChange: "transform",
  },
  displayImg: {
    objectFit: "contain",
    textAlign: "center"
  },
  main: {
    backgroundColor: "#000",
    overflow: "hidden",
    position: "relative",
    width: "90vw",
    height: "90vw",
  },
  move: {
    display: "flex",
    position: "absolute",
    width: "40px",
    height: "40px",
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "0",
  },
  back: {
    left: "5px",
  },
  next: {
    right: "5px",
  }
}));



const MediaDisplay = (props) => {
  const classes = useStyles();
  const { mediaUrls } = props;
  // const mediaUrls = [{url: "https://images.megapixl.com/2485/24853666.jpg"}, {url: "https://images.megapixl.com/2485/24853666.jpg"},{url: "https://images.megapixl.com/2485/24853666.jpg"},]
  const [currIndex, setCurrIndex] = useState(0);
  const [movement, setMovement] = useState(0);
  const [lastTouch, setLastTouch] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(0);
  const [transitionTimeout, setTransitionTimeout] = useState(0);
  const [wheelTimeout, setWheelTimeout] = useState(null);

  const handleWheel = (e) => {
    clearTimeout(wheelTimeout);
    handleMovement(e.deltaX);
    setWheelTimeout(setTimeout(() => handleMovementEnd(), 100));
  };

  const handleMovement = (delta) => {
    clearTimeout(transitionTimeout);
    const maxLength = mediaUrls.length - 1;
    let nextMovement = movement + delta;
  
    if (nextMovement < 0) {
      nextMovement = 0;
    }
  
    if (nextMovement > maxLength * IMG_WIDTH) {
      nextMovement = maxLength * IMG_WIDTH;
    }
  
    setMovement(nextMovement);
    setTransitionDuration("0s");
  };

  const handleTouchStart = (e) => {
    setLastTouch(e.nativeEvent.touches[0].clientX);
  }

  const handleTouchMove = e => {
    const delta = lastTouch - e.nativeEvent.touches[0].clientX;
    setLastTouch(e.nativeEvent.touches[0].clientX);
    handleMovement(delta);
  };

  const handleMovementEnd = () => {  
    const endPosition = movement / IMG_WIDTH;
    const endPartial = endPosition % 1;
    const endingIndex = endPosition - endPartial;
    const deltaInteger = endingIndex - currIndex;
    let nextIndex = endingIndex;
    if (deltaInteger >= 0) {
      if (endPartial >= 0.1) {
        nextIndex += 1;
      }
    }
    transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));
  };

  const handleTouchEnd = () => {
    handleMovementEnd();
    setLastTouch(0);
  };

  const transitionTo = (index, duration) => {
    setCurrIndex(index);
    setMovement(index * IMG_WIDTH);
    setTransitionDuration(`${duration}s`);
    setTransitionTimeout(setTimeout(() => {
      setTransitionDuration("0s");
    }, duration * 100));
  };

  return (
    <Box display="flex" flexDirection="column">
      <div
        className={classes.main}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div 
          className={classes.swiper}
          style={{
            transform: `translateX(${movement * -1}px)`,
            transitionDuration: transitionDuration,
          }}
        >
          {mediaUrls.map((media, idx) => {
            const src = media.url;
            if (!src) {
              return null;
            }
            return (<img key={idx} src={src} width="100%" height="100%" />);
          })}
        </div>
      </div>
      <Grid container>
        <Grid item xs={4}>
          <Button
            disabled={currIndex === 0}
            onClick={() => transitionTo(currIndex - 1, 0.5)}
          >
            Previous
          </Button>
        </Grid>
        <Grid item xs={4}>
          <p>
            {currIndex + 1} / {mediaUrls.length}
          </p>
        </Grid>
        <Grid item xs={4}>
          <Button
            disabled={currIndex === mediaUrls.length - 1}
            onClick={() => transitionTo(currIndex + 1, 0.5)}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MediaDisplay;