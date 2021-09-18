import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NoDataImage from "../assets/no_data.png";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    padding: theme.spacing(2, 0),
  },
  image: {
    width: "60%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const NoneAvailable = ({ text }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={NoDataImage} alt={text} />
        </div>
        <Typography variant="h4" align="center">
          {text}
        </Typography>
      </Grid>
    </>
  );
};

export default NoneAvailable;
