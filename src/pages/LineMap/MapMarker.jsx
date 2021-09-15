import { IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import LocationOn from "@material-ui/icons/LocationOn";
import { Marker, Popup } from "react-map-gl";

const MapMarker = ({ memory }) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <Marker
        latitude={memory.latitude}
        longitude={memory.longitude}
        offsetTop={-30}
        offsetLeft={-24}
      >
        <IconButton onClick={() => setShowPopup(true)}>
          <LocationOn />
        </IconButton>
      </Marker>
      {showPopup ? (
        <Popup
          latitude={memory.latitude}
          longitude={memory.longitude}
          onClose={() => setShowPopup(false)}
        >
          <div>
            {/* TODO: Do reverse geocoding to get the location name and display it here. Also add a button in each popup to go to the memory */}
            <Typography variant="h6">{memory.title}</Typography>
            <Typography variant="body1">{memory.description}</Typography>
            <Typography variant="body1">
              {memory.creation_date.toString()}
            </Typography>
          </div>
        </Popup>
      ) : null}
    </>
  );
};

export default MapMarker;
