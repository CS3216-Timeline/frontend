import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import MapDisplay from "./MapDisplay";
import MapIcon from "@material-ui/icons/Map";
import { memoriesData } from "./data";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { COLORS } from "../../utils/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Fab, makeStyles } from "@material-ui/core";
// To show a line map with markers of locations of the memories
// Will need the exact same data as the Line page

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  fab: {
    margin: 0,
    top: "auto",
    left: 30,
    bottom: 75,
    right: "auto",
    position: "fixed",
  },
}));

const LineMap = () => {
  const classes = useStyles();
  // TODO: UNCOMMENT THIS LATER
  // const { line_id } = useParams();
  const { latitude, longitude } = memoriesData[0];
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    height: "100vh",
    width: "95vw",
    zoom: 10,
  });

  // TODO: useEffect to get the data of the memories of the
  // line based on the line_id and userId
  // Preferbly at backend, it is already sorted from most recent one being the first
  // After that, we will have to create the line connectors that connect line from one
  // marker to another

  return (
    <>
      <div className={classes.root}>
        <PrivatePageHeader
          text={"Memories Map"}
          icon={
            <MapIcon
              style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
            />
          }
        />
        <MapDisplay
          memoriesData={memoriesData}
          viewport={viewport}
          setViewport={setViewport}
        />
        <Fab
          size="small"
          color="primary"
          className={classes.fab}
          onClick={() => {
            // TODO: go back to the memory timeline page
          }}
        >
          <ArrowBackIcon />
        </Fab>
      </div>
    </>
  );
};

export default LineMap;
