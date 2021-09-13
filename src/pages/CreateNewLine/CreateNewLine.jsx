import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import { GithubPicker } from "react-color";
import { COLORS } from "../../utils/colors";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { createNewLine } from "../../services/lines";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [lineTitle, setLineTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS.RED);

  const createLine = async () => {
    if (!lineTitle) {
      dispatch(setAlert("Line Title cannot be empty", "error"));
      return;
    }
    try {
      setLoading(true);
      const line = await createNewLine(lineTitle, selectedColor);
      console.log(line);
      dispatch(setAlert("Line Successfully created", "success"));
      // TODO: If want, can redirect to line page instead
      history.push("/");
    } catch (err) {
      dispatch(setAlert(err.message, "error"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.container}>
            <PrivatePageHeader
              text={"Create a new line"}
              icon={
                <LinearScaleIcon
                  style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
                />
              }
            />
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
