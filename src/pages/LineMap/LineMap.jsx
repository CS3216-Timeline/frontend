import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import MapDisplay from "./MapDisplay";
import { memoriesData } from "./data";
// To show a line map with markers of locations of the memories
// Will need the exact same data as the Line page

const LineMap = () => {
  // TODO: UNCOMMENT THIS LATER
  // const { line_id } = useParams();
  const { latitude, longitude } = memoriesData[0];
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    height: "100vh",
    width: "100vw",
    zoom: 10,
  });

  // TODO: useEffect to get the data of the memories of the
  // line based on the line_id and userId
  // Preferbly at backend, it is already sorted from most recent one being the first
  // After that, we will have to create the line connectors that connect line from one
  // marker to another

  return (
    <>
      <MapDisplay
        memoriesData={memoriesData}
        viewport={viewport}
        setViewport={setViewport}
      />
    </>
  );
};

export default LineMap;
