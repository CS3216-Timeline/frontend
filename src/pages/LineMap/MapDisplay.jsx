import React from "react";
import ReactMapGL from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { MAPBOX_API_TOKEN } from "../../services/locationService";
import { getLineConnectors } from "../../utils/map";
import MapMarker from "./MapMarker";
import MapMarkerConnector from "./MapMarkerConnector";

// https://stackoverflow.com/questions/67842338/how-to-use-react-map-gl-to-draw-line-between-two-point
// how to draw a line between the 2 points
const MapDisplay = ({ memoriesData, viewport, setViewport }) => {
  const lineConnectors = getLineConnectors(memoriesData);
  return (
    <>
      <DeckGL initialViewState={viewport} controller={true}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_API_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          // everytime user drag/zoom, will cause map to re-render
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          {memoriesData.map((memory) => (
            <MapMarker memory={memory} key={memory.memory_id} />
          ))}
          {lineConnectors.map((lineConnector) => (
            // TODO: change the key
            <MapMarkerConnector
              lineConnector={lineConnector}
              key={Math.random()}
            />
          ))}
        </ReactMapGL>
      </DeckGL>
    </>
  );
};

export default MapDisplay;
