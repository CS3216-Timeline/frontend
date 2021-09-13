import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import { mockLinesData } from "./data";
import LineCard from "./LineCard";
import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getAllLinesByUserIdOrderByMostRecentMemory } from "../../services/lines";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   backgroundColor: COLORS.WHITE,
  // },
  addLineButtonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  linesContainer: {
    padding: theme.spacing(2, 2, 15, 2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [lines, setLines] = useState([]);
  // const [lines, setLines] = useState(mockLinesData);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getLinesByUser = async () => {
      try {
        const linesByUser = await getAllLinesByUserIdOrderByMostRecentMemory();
        setLines(linesByUser);
      } catch (err) {
        dispatch(
          setAlert("Oops, Failed to get the lines, please try again!", "error")
        );
      }
    };
    getLinesByUser();
  }, [dispatch]);

  const onAddLineClick = () => {
    history.push("/createnewline");
  };

  return (
    <Fragment>
      <div className={classes.root}>
        {/* TODO: Add some info on how to use the app if there are no lines at first */}
        <Grid container className={classes.linesContainer}>
          <Grid item xs={12} className={classes.addLineButtonContainer}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddLineClick}
            >
              Add Line
            </Button>
          </Grid>
          {lines ? (
            lines.map((line) => (
              <Grid item xs={12} key={line.line_id}>
                <LineCard line={line} />
              </Grid>
            ))
          ) : (
            <Typography variant="h3">NO LINES CREATED YET</Typography>
          )}
          {/* Show something else if empty, make it nice */}
        </Grid>
      </div>
    </Fragment>
  );
};

export default Home;
