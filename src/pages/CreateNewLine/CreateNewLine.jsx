import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import { GithubPicker } from "react-color";
import { colorPickerArray, COLORS } from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../actions/alert";
import { createNewLine } from "../../services/lines";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import { createLineForUser } from "../../actions/line";

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
  const auth = useSelector((state) => state.auth);
  const [lineTitle, setLineTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS.MAROON);

  // const createLine = async () => {
  //   if (!lineTitle) {
  //     dispatch(setAlert("Line Title cannot be empty", "error"));
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const line = await createNewLine(lineTitle, selectedColor);
  //     console.log(line);
  //     dispatch(setAlert(`Line ${line.name} successfully created`, "success"));
  //     history.push("/");
  //   } catch (err) {
  //     dispatch(setAlert(err.message, "error"));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const createLine = async () => {
    if (!lineTitle) {
      dispatch(setAlert("Line Title cannot be empty", "error"));
      return;
    }
    try {
      dispatch(createLineForUser(lineTitle, selectedColor, auth.user.userId));
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
                <Tooltip title="Create a line to add memories to it!">
                  <LinearScaleIcon
                    style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
                  />
                </Tooltip>
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
              <Typography variant="h4" style={{ color: COLORS.BLACK }}>
                Choose your line color
              </Typography>
              <hr
                style={{
                  border: `5px solid ${selectedColor}`,
                }}
              />
              {/* https://casesandberg.github.io/react-color/ */}
              <GithubPicker
                color={selectedColor}
                colors={[...colorPickerArray]}
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
