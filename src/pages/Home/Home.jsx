import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import { mockLinesData } from "./data";
import LineCard from "./LineCard";
import { Button, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getAllLinesByUserIdOrderByMostRecentMemory } from "../../services/lines";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { COLORS } from "../../utils/colors";
import { filterLines } from "../../utils/lines";
import NoLinesAvailable from "./NoLinesAvailable";

const useStyles = makeStyles((theme) => ({
  addLineButtonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  linesContainer: {
    padding: theme.spacing(2, 2, 8, 2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textFieldContainer: {
    padding: theme.spacing(1, 0, 1, 0),
  },
}));

const Home = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [lines, setLines] = useState([]);
  const [searchText, setSearchtext] = useState("");
  const [searchedLines, setSearchedLines] = useState([]);
  // const [lines, setLines] = useState(mockLinesData);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getLinesByUser = async () => {
      try {
        const linesByUser = await getAllLinesByUserIdOrderByMostRecentMemory();
        setLines(linesByUser);
        setSearchedLines(linesByUser);
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

  const searchLines = (e) => {
    e.preventDefault();
    setSearchtext(e.target.value);
    const filteredLines = filterLines(e.target.value, lines);
    setSearchedLines(filteredLines);
  };

  return (
    <Fragment>
      <div className={classes.root}>
        {/* TODO: Add some info on how to use the app if there are no lines at first */}
        <Grid container className={classes.linesContainer}>
          <Grid item xs={12} className={classes.addLineButtonContainer}>
            <PrivatePageHeader
              text={"Home"}
              icon={
                <HomeIcon
                  style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
                />
              }
            />
            <Button
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddLineClick}
            >
              Add Line
            </Button>
            <div className={classes.textFieldContainer}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Search Lines"
                autoFocus
                onChange={(e) => {
                  searchLines(e);
                }}
              >
                {searchText}
              </TextField>
            </div>
          </Grid>
          {searchText === "" ? (
            lines.map((line) => (
              <Grid item xs={12} key={line.line_id}>
                <LineCard line={line} />
              </Grid>
            ))
          ) : searchedLines.length > 0 ? (
            searchedLines.map((line) => (
              <Grid item xs={12} key={line.line_id}>
                <LineCard line={line} />
              </Grid>
            ))
          ) : (
            <NoLinesAvailable text={"No lines that matched search"} />
          )}
          {lines.length === 0 && (
            <NoLinesAvailable text={"No lines created yet, create one now!"} />
          )}
        </Grid>
      </div>
    </Fragment>
  );
};

export default Home;
