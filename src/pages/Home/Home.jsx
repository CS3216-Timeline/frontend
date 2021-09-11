import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { mockLinesData } from "./data";
import LineCard from "./LineCard";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
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
  const [lines, setLines] = useState(mockLinesData);
  const history = useHistory();
  // TODO: useEffect to fetch all the lines, then setLines to save the lines

  const onAddLineClick = () => {
    history.push("/createnewline");
  };

  return (
    <Fragment>
      <div className={classes.root}>
        {/* TODO: Add some info on how to use the app if there are no lines at first */}
        <Grid container spacing={3} className={classes.linesContainer}>
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
          {lines.map((line) => (
            <Grid item xs={12} key={line.line_id}>
              <LineCard line={line} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
};

export default Home;
