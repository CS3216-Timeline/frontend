import axios from 'axios';
import _ from 'lodash';

// store these somewhere else in future
export const MAPBOX_API_TOKEN =
  "pk.eyJ1IjoiYWN5YW5nOTciLCJhIjoiY2t0ZThvNTcwMDRwNzJybncxaTJpeG93aSJ9.0dQconyG7nAag70nDvrpew";

const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

/**
 * @param {string} newSearchValue 
 * @param {{longitude: number, latitude: number}} currentLocation 
 */
export const getLocationSuggestions = async (newSearchValue, currentLocation) => {
  try {
    const searchTextInQuery = newSearchValue ? newSearchValue : "singapore"; // query needs to include a search text
    let searchQuery = `${url}${searchTextInQuery}.json?worldview=cn&limit=10&access_token=${MAPBOX_API_TOKEN}`;
    if (!_.isEmpty(currentLocation)) {
      searchQuery += `&proximity=${currentLocation.longitude},${currentLocation.latitude}`;
    }
    const res = await axios.get(searchQuery);
    return res;
  } catch (err) {
    throw err;
  }
}

export const getGeographicFeature = async (latitude, longitude) => {
  try {
    let searchQuery = `${url}${longitude},${latitude}.json?worldview=cn&access_token=${MAPBOX_API_TOKEN}`;
    const res = await axios.get(searchQuery);
    return res;
  } catch (err) {
    throw err;
  }
}
