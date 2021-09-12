import React from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { MAPBOX_API_TOKEN } from "../../services/locationService";
import LocationOn from "@material-ui/icons/LocationOn";
import { IconButton, Typography } from "@material-ui/core";

const MapDisplay = ({ selectedLocation, viewport, setViewport }) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        // everytime user drag/zoom, will cause map to re-render
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {selectedLocation && (
          <Marker
            latitude={selectedLocation.geometry.coordinates[1]}
            longitude={selectedLocation.geometry.coordinates[0]}
            // https://github.com/visgl/react-map-gl/issues/1052
            // NOTE: Honestly, I still dk what should be the right values for offset,
            // these are the best values I felt that can be used after testing
            offsetTop={-30}
            offsetLeft={-24}
          >
            <IconButton onClick={() => setShowPopup(true)}>
              <LocationOn />
            </IconButton>
          </Marker>
        )}
        {showPopup ? (
          <Popup
            latitude={selectedLocation.geometry.coordinates[1]}
            longitude={selectedLocation.geometry.coordinates[0]}
            onClose={() => setShowPopup(false)}
          >
            <div>
              <Typography variant="body1">
                {selectedLocation.place_name}
              </Typography>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
};

export default MapDisplay;
