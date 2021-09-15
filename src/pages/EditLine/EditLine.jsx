import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import { GithubPicker } from "react-color";
import { COLORS } from "../../utils/colors";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { editLineById, getLineById } from "../../services/lines";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import Loading from "../../components/Loading";
import { useHistory, useParams } from "react-router-dom";

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
  cancelButton: {
    backgroundColor: COLORS.RED,
    color: COLORS.WHITE,
  },
}));

const EditLine = () => {
  const classes = useStyles();
  const { lineId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [lineTitle, setLineTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS.RED);

  useEffect(() => {
    const getLineInfo = (lineId) => {
      const line = getLineById(lineId);
      setLineTitle(line.title);
      setSelectedColor(line.color);
    };
    getLineInfo(lineId);
  }, [lineId]);

  const editLine = async () => {
    if (!lineTitle) {
      dispatch(setAlert("Line Title cannot be empty", "error"));
      return;
    }
    try {
      setLoading(true);
      const editedLine = await editLineById(lineId, lineTitle, selectedColor);
      console.log("editedLine", editedLine);
      dispatch(setAlert("Line Successfully edited", "success"));
      history.push(`/line/${lineId}`);
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
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.container}>
            <PrivatePageHeader
              text={"Edit your line"}
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
              value={lineTitle}
              autoFocus
              onChange={(e) => setLineTitle(e.target.value)}
            />
            <Grid item xs={12} className={classes.selectColorContainer}>
              <Typography variant="h4">Choose your new line color</Typography>
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
              <Box paddingY={1}>
                <Button
                  fullWidth
                  className={classes.cancelButton}
                  variant="contained"
                  startIcon={<CloseIcon />}
                  onClick={() => history.push(`/line/${lineId}`)}
                >
                  Cancel
                </Button>
              </Box>
              <Box paddingY={1}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={editLine}
                >
                  Edit Line
                </Button>
              </Box>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default EditLine;
