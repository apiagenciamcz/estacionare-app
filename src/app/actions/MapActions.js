import { Dimensions, Animated } from "react-native";
import axios from "axios";
import _ from "lodash";

let { width, height } = Dimensions.get("window");
let ASPECT_RATIO = width / height;
let LATITUDE_DELTA = 0.005;
let LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

let watchID = null;

export const initLocalization = () => dispatch => {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(position);
      dispatch({
        type: "LOCATION_USER",
        payload: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });

      dispatch(watchPosition());
    },
    error => console.log(error),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
  );
};

export const watchPosition = () => (dispatch, getState) => {
  watchID = navigator.geolocation.watchPosition(
    position => {
      if (
        getState().map.currentUser.latitude != position.coords.latitude ||
        getState().map.currentUser.longitude != position.coords.longitude
      ) {
        setTimeout(() => {
          dispatch({
            type: "LOCATION_CURRENT",
            payload: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });

          dispatch(getSensors(position.coords));

          if (getState().map.searchDestiny != null) {
            dispatch({
              type: "LOCATION_USER",
              payload: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            });
          }
        }, 100);
      }
    },
    error => console.log(error),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
      distanceFilter: 5
    }
  );
};

export const getSensors = position => dispatch => {
  let { latitude, longitude } = position;

  axios
    .get(
      `https://rdani.fernandobona.com/data?lon=${longitude}&lat=${latitude}&r=5000`,
      {
        headers: {
          token:
            "5131d98fd458a9aa2e54d213781b0181ddd1712c0387e42ea5db60b40de4a08b61e6f17a20c625c2305f27509fa2cf88fce67c6ded86aa3bdf914291227277500765256e653d04c6f0d2ca4b19fab842a7f8a6eb3878f6f16be0fc0f209e1823bf58cb4206dce0e15ab37cbedb9170a8cc178fed3dc1ba2425d7625fda93a2",
          content: "application/json"
        }
      }
    )
    .then(res => {
      dispatch({
        type: "GET_SENSORS",
        payload: res.data.sensors
      });
    });
};

export const search = text => (dispatch, getState) => {
  let { location } = getState().map;

  dispatch({
    type: "CHANGE_SEARCH",
    payload: text
  });

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURI(
        text
      )}&location=${location.latitude},${
        location.longitude
      }&language=pt-BR&radius=10000&key=AIzaSyDqK_G4WO7USQbA5n0mhvK-yR7DeUBO17w`
    )
    .then(res => {
      dispatch({
        type: "CHANGE_LIST_LOCATIONS",
        payload: res.data.predictions
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const setLocationSeach = (id, description) => (dispatch, getState) => {
  dispatch({
    type: "CHANGE_LIST_LOCATIONS",
    payload: {}
  });

  dispatch({
    type: "CHANGE_SEARCH",
    payload: description
  });

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=name,geometry&key=AIzaSyDqK_G4WO7USQbA5n0mhvK-yR7DeUBO17w`
    )
    .then(res => {
      dispatch({
        type: "CHANGE_DESTINY_LOCATIONS",
        payload: {
          destination: {
            latitude: res.data.result.geometry.location.lat,
            longitude: res.data.result.geometry.location.lng
          },
          name: res.data.result.name
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const animatedSearch = (widthAnim, flag) => dispatch => {
  if (flag) {
    dispatch({
      type: "ICON_SEARCH",
      payload: "times"
    });

    dispatch({
      type: "FLAG_BUTTON_SEARCH",
      payload: false
    });

    Animated.timing(widthAnim, {
      toValue: 200,
      duration: 200
    }).start();
  } else {
    dispatch({
      type: "ICON_SEARCH",
      payload: "search"
    });

    dispatch({
      type: "FLAG_BUTTON_SEARCH",
      payload: true
    });

    dispatch({
      type: "CHANGE_LIST_LOCATIONS",
      payload: {}
    });

    dispatch({
      type: "CHANGE_SEARCH",
      payload: ""
    });

    dispatch({
      type: "CHANGE_DESTINY_LOCATIONS",
      payload: null
    });

    dispatch(dragMap(true));

    Animated.timing(widthAnim, {
      toValue: 0,
      duration: 200
    }).start();
  }
};

export const currentLocation = () => dispatch => {
  navigator.geolocation.clearWatch(watchID);

  navigator.geolocation.getCurrentPosition(
    position => {
      dispatch({
        type: "LOCATION_USER",
        payload: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });

      dispatch(watchPosition());
    },
    error => console.log(error),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
  );
};
