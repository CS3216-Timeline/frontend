import React from "react";
import { Source, Layer } from "react-map-gl";
// https://docs.mapbox.com/mapbox-gl-js/example/data-driven-lines/

const MapMarkerConnector = ({ lineConnector }) => {
  const layerStyle = {
    id: "lines",
    type: "line",
    source: "lines",
    paint: {
      "line-width": 3,
      // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
      // to set the line-color to a feature property value.
      "line-color": ["get", "color"],
    },
  };
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [103.860842, 1.422995],
            [103.990041, 1.359292],
          ],
        },
      },
    ],
  };

  return (
    <>
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </>
  );
};

export default MapMarkerConnector;
