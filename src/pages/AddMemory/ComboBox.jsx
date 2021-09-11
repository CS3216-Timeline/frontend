/* eslint-disable no-use-before-define */
import React, { useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import _ from "lodash";
import { CircularProgress, Typography } from "@material-ui/core";
import { getLocationSuggestions } from "../../services/locationService";

export const ComboBox = ({ currentLocation }) => {
  const [predictions, setPredictions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeLocation = (event, value) => {
    setSelectedLocation(value); // selected location object
  };

  const getSearchResults = async (newSearchValue) => {
    setLoading(true);
    try {
      const res = await getLocationSuggestions(newSearchValue, currentLocation);
      const predictionsFromSearch = res.data.features.map((location) => {
        return {
          place_name: location.place_name,
          geometry: location.geometry,
        };
      });
      setPredictions(predictionsFromSearch);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedSearch = useCallback(
    _.debounce((newSearchValue) => {
      getSearchResults(newSearchValue);
    }, 200),
    []
  );

  // Need a default 'search' parameter.
  const handleInputChange = async (event, newSearchValue) => {
    await delayedSearch(newSearchValue ? newSearchValue : "Singapore");
  };

  return (
    <>
      <Autocomplete
        id="place_name"
        options={predictions}
        getOptionLabel={(option) => option.place_name}
        getOptionSelected={(option, value) => (option.id = value.place_name)}
        onChange={handleChangeLocation}
        style={{ width: "100%" }}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Location"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      {/* just to show that it works */}
      <Typography variant="body1">for testing</Typography>
      <Typography variant="body1">
        place_name: {selectedLocation && selectedLocation.place_name}
      </Typography>
      <Typography variant="body1">
        coordinates: {selectedLocation && selectedLocation.geometry.coordinates}
      </Typography>
    </>
  );
};

export default ComboBox;
