import axios from "axios";
import { NavigationActions } from "react-navigation";
import { saveState, saveCity } from "./ReceiptAction";
const urlAPI = "https://br-cidade-estado-nodejs.glitch.me/estados/";

export const getStates = () => dispatch => {
  axios.get(urlAPI).then(data => {
    dispatch({
      type: "GET_STATES",
      payload: data
    });
    dispatch(modalVisibleState("visible"));
  });
};

export const setStateLocation = uf => dispatch => {
  axios.get(`${urlAPI}${uf}`).then(async request => {
    await dispatch(getCitys(uf));
    await dispatch(saveState(request.data));
    await dispatch(modalVisibleState("hidden"));
    await console.log(request.data, "State Location");

    await dispatch({
      type: "CHANGE_STATE",
      payload: request.data
    });
  });
};

export const getCitys = uf => dispatch => {
  axios.get(`${urlAPI}${uf}/cidades`).then(async request => {
    console.log("CHEGUEI aqui", request);
    dispatch({
      type: "GET_CITYS",
      payload: request
    });
    console.log("TESTEE");
    dispatch(modalCity());
  });
};

export const setCityLocation = itemValue => {
  return [
    modalVisibleCity("hidden"),
    saveCity(itemValue),
    navigation(),
    {
      type: "CHANGE_CITY",
      payload: itemValue
    }
  ];
};

export const modalVisibleState = oper => {
  console.log(oper);
  return {
    type: "MODAL_VISIBLE_STATE",
    payload: oper
  };
};

export const modalVisibleCity = oper => {
  return {
    type: "MODAL_VISIBLE_CITY",
    payload: oper
  };
};

export const modalCity = () => {
  return {
    type: "ENABLE_MODAL_CITY",
    payload: false
  };
};

export const navigation = () => {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({
        routeName: "PayStepTwo"
      })
    );
  };
};

export const getLocations = () => dispatch => {
  navigator.geolocation.getCurrentPosition(
    position => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${
            position.coords.latitude
          },${
            position.coords.longitude
          }&key=AIzaSyDqK_G4WO7USQbA5n0mhvK-yR7DeUBO17w`
        )
        .then(response => {
          let city = response.data.results[0].address_components[3].long_name;
          let state = response.data.results[0].address_components[4].short_name;

          dispatch({
            type: "CHANGE_STATE",
            payload: state
          });

          dispatch({
            type: "CHANGE_CITY",
            payload: city
          });

          // setTimeout(()=>{
          //     dispatch(
          //         NavigationActions.navigate({
          //             routeName: 'PayStepTwo',
          //         })
          //     )
          // },1000)
        });
    },
    error => console.log(error),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
  );
};
