import { Grid, makeStyles, Typography, Box, Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import aroundTheWorldImage from "../../assets/around-the-world.png";
import friendshipImage from "../../assets/friendship.png";
import momentsImage from "../../assets/moments.png";
import logoImage from "../../assets/timeline-logo.png";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    fontFamily: "Lato",
  },
  header: {
    fontSize: "30pt",
    letterSpacing: "8px",
    textAlign: "center",
    margin: "15px 0",
    fontWeight: 500,
  },
  subContent: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  featureHeader: {
    textAlign: "center",
  },
  logoImage: {
    width: "75%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    width: "80%",
    height: "auto",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Box component="div" className={classes.heroContent}>
        <img className={classes.logoImage} src={logoImage} alt={"logo"} />
        {/* <h3 className={classes.header}>TIMELINE</h3> */}
        <Box component="div" className={classes.subContent}>
          <Typography variant="h6" align="center">
            {/* TODO: Update this later */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            totam recusandae illo eius fugit, dolorem nulla magnam ut facere
            voluptatem perferendis officiis consectetur, fugiat tempora laborum
            aliquam accusantium quos. Corrupti?
          </Typography>
        </Box>
        <Button
          onClick={() => {
            history.push("/signin");
          }}
          color="primary"
          variant="contained"
        >
          USE IT NOW
        </Button>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <img
                className={classes.image}
                src={aroundTheWorldImage}
                alt={"around the world"}
              />
              <h2 className={classes.featureHeader}>Feature 1</h2>
              <Typography variant="h6" align="center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repudiandae iusto unde quibusdam, iste dolorem consequuntur enim
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <div>
                <img
                  className={classes.image}
                  src={momentsImage}
                  alt={"moments"}
                />
              </div>
              <h2 className={classes.featureHeader}>Feature 2</h2>
              <Typography variant="h6" align="center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repudiandae iusto unde quibusdam, iste dolorem consequuntur enim
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <div>
                <img
                  className={classes.image}
                  src={friendshipImage}
                  alt={"friendship"}
                />
              </div>
              <h2 className={classes.featureHeader}>Feature 3</h2>
              <Typography variant="h6" align="center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repudiandae iusto unde quibusdam, iste dolorem consequuntur enim
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default Landing;
