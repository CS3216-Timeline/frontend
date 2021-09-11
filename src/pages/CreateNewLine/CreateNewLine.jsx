import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { GithubPicker } from "react-color";
import { COLORS } from "../../utils/colors";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4, 4),
    alignItems: "center",
  },
  selectColorContainer: {
    padding: theme.spacing(3, 0),
  },
  addLineButtonContainer: {
    justifyContent: "center",
    width: "100%",
  },
}));

const CreateNewLine = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [lineTitle, setLineTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS.RED);

  const createLine = () => {
    if (!lineTitle) {
      dispatch(setAlert("Line Title cannot be empty"));
      return;
    }
    // do a post request to the backend to create a line
    // send the line color and line title
    // after it is created, go to the add memory page
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.container}>
            <Typography variant="h2">Create a new line!</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Line Title"
              name="lineTitle"
              autoFocus
              onChange={(e) => setLineTitle(e.target.value)}
            >
              {lineTitle}
            </TextField>
            <Grid item xs={12} className={classes.selectColorContainer}>
              <Typography variant="h4">Choose your line color</Typography>
              <hr
                style={{
                  border: `5px solid ${selectedColor}`,
                }}
              />
              {/* https://casesandberg.github.io/react-color/ */}
              <GithubPicker
                color={selectedColor}
                colors={[
                  COLORS.RED,
                  COLORS.ORANGE,
                  COLORS.YELLOW,
                  COLORS.GREEN,
                  COLORS.CYAN,
                  COLORS.BLUE,
                  COLORS.DARK_BLUE,
                  COLORS.PURPLE,
                  COLORS.LIGHT_RED,
                  COLORS.LIGHT_ORANGE,
                  COLORS.LIGHT_YELLOW,
                  COLORS.LIGHT_GREEN,
                  COLORS.LIGHT_CYAN,
                  COLORS.LIGHT_BLUE,
                  COLORS.LIGHT_DARK_BLUE,
                  COLORS.LIGHT_PURPLE,
                ]}
                onChange={(newColor) => {
                  setSelectedColor(newColor.hex);
                }}
              />
            </Grid>
            {/* 
              Next Button to go to the add memory page.
              Create line on the backend, before going to the next new line page.
            */}
            <Grid item xs={12} className={classes.addLineButtonContainer}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={createLine}
              >
                Create Line
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CreateNewLine;
