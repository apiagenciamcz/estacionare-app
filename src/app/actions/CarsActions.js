import { AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
import { NavigationActions } from "react-navigation";
import { saveCar } from "./ReceiptAction";

export const getCars = () => {
  return dispatch => {
    AsyncStorage.getItem("CurrentUser").then(userID => {
      firebase
        .database()
        .ref(`users/${userID}/cars`)
        .once("value")
        .then(snapshot => {
          dispatch({
            type: "GET_CARS",
            payload: snapshot
          });
        });
    });
  };
};

export const setCar = itemCar => {
  return [saveCar(itemCar), navigate()];
};

export const navigate = () => {
  return dispatch => {
    dispatch(
      NavigationActions.navigate({
        routeName: "PayStepThree"
      })
    );
  };
};
