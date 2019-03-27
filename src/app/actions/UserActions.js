import firebase from "react-native-firebase";
import { AsyncStorage, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import CardValidator from "card-validator";

export const getUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dispatch({
        type: "GET_USER",
        payload: user._user
      });
    }
  });

  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/name`)
      .once("value")
      .then(snapshot => {
        dispatch({
          type: "GET_NAME",
          payload: snapshot._value
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export const getCarsUser = () => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/cars`)
      .once("value")
      .then(snapshot => {
        if (snapshot._value == null) {
          dispatch({
            type: "GET_CARS",
            payload: []
          });
        } else {
          dispatch({
            type: "GET_CARS",
            payload: snapshot._value
          });
        }
      });
  });
};

export const getFontSize = () => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/fontSize`)
      .once("value")
      .then(snapshot => {
        dispatch({
          type: "GET_FONT_SIZE",
          payload: snapshot._value
        });
      });
  });
};

export const updateFontSize = size => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userId => {
    firebase
      .database()
      .ref("users/" + userId)
      .update({
        fontSize: parseFloat(size.toFixed(1))
      })
      .then(() => {
        dispatch(getFontSize());
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export const changeOper = (index, flag) => (dispatch, getState) => {
  let cars = getState().user.cars;
  cars[index].activeOper = flag;

  dispatch({
    type: "GET_CARS",
    payload: cars
  });
};

export const changeTextOper = (index, text) => (dispatch, getState) => {
  let cars = getState().user.cars;
  cars[index].name = text;

  dispatch({
    type: "GET_CARS",
    payload: cars
  });
};

export const saveEditCar = (index, text) => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/cars/${index}`)
      .update({
        name: text
      })
      .then(() => {
        dispatch({
          type: "ALTER_NAME"
        });
      })
      .then(() => {
        dispatch(getCarsUser());
      });
  });
};

export const deleteEditCar = index => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/cars/${index}`)
      .remove();

    dispatch({
      type: "DELETE_CAR"
    });

    dispatch(getCarsUser());
  });
};

export const addCar = () => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/cars`)
      .push({
        name: "",
        value: ""
      })
      .then(() => {
        dispatch(getCarsUser());
      });
  });
};

export const getNotificationsUser = () => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/notifications`)
      .once("value")
      .then(snapshot => {
        dispatch({
          type: "GET_NOTIFICATIONS",
          payload: snapshot._value
        });
      });
  });
};

export const changeNotificationUser = (itemNotification, val) => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/notifications/`)
      .update({
        [itemNotification]: val
      })
      .then(() => {
        dispatch({
          type: "CHANGE_ITEM_NOTIFICATION",
          payload: { item: itemNotification, val: val }
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export const getCardsUser = () => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/cards`)
      .once("value")
      .then(snapshot => {
        dispatch({
          type: "GET_CARDS",
          payload: snapshot._value
        });
      });
  });
};

export const getlistReceipts = () => dispatch => {
  console.log("user");
  AsyncStorage.getItem("CurrentUser").then(userID => {
    console.log(userID);
    firebase
      .database()
      .ref(`users/${userID}/receipts`)
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val());

        dispatch({
          type: "GET_RECEIPTS",
          payload: snapshot.val()
        });
      });
  });
};

export const saveName = name => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}`)
      .update({
        name: name
      })
      .then(() => {
        console.log(name);
        dispatch({
          type: "GET_NAME",
          payload: name
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export const changeEmail = text => (dispatch, getState) => {
  const currentEmail = getState().user.user.email;

  dispatch({
    type: "USER_VALIDATION",
    payload: {
      type: "email",
      currentValue: currentEmail,
      newValue: text
    }
  });
};

export const changePassword = text => dispatch => {
  dispatch({
    type: "USER_VALIDATION",
    payload: {
      type: "password",
      currentValue: "",
      newValue: text
    }
  });
};

export const textConfirmPassword = text => {
  return {
    type: "CHANGE_PASSWORD_VALID",
    payload: text
  };
};

export const modalVisiblePassword = flag => {
  return {
    type: "CHANGE_MODAL",
    payload: flag
  };
};

alertUser = (title, text) => {
  Alert.alert(title, text);
  return {
    type: "ALERT_USER"
  };
};

export const saveConfirmPassword = confirmPassword => (dispatch, getState) => {
  const { type, newValue } = getState().user.userValidation;

  if (confirmPassword.length > 0) {
    if (type === "email") {
      dispatch(
        changeFirebaseEmail(confirmPassword, newValue.toString().trim())
      );
      dispatch({
        type: "CHANGE_FIREBASE_EMAIL"
      });
    } else if (type === "password") {
      dispatch(changeFirebasePassword(newValue));
      dispatch({
        type: "CHANGE_FIREBASE_EMAIL"
      });
    }
  } else {
    alertUser("Erro", "Por favor, digite sua senha atual");
  }
};

reauthenticate = currentPassword => {
  var user = firebase.auth().currentUser;

  if (user.providerData == "google.com") {
  } else if (user.providerData == "facebook.com") {
  } else {
  }
};

changeFirebaseEmail = newEmail => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    firebase
      .auth()
      .currentUser.updateEmail(newEmail)
      .then(() => {
        dispatch(loading(false));
        dispatch(modalVisiblePassword(false));

        setTimeout(() => {
          dispatch({
            type: "USER_VALIDATION",
            payload: {}
          });
          dispatch({
            type: "CHANGE_PASSWORD_VALID",
            payload: ""
          });
          dispatch(alertUser("Sucesso", "Email Editado com sucesso"));
          dispatch(getUser());
        }, 1000);
      })
      .catch(error => {
        dispatch(loading(false));
        dispatch(modalVisiblePassword(false));

        setTimeout(() => {
          dispatch({
            type: "USER_VALIDATION",
            payload: {}
          });
          dispatch({
            type: "CHANGE_PASSWORD_VALID",
            payload: ""
          });
          dispatch(alertUser("Sucesso", "Email Editado com sucesso"));
          dispatch(getUser());
        }, 1000);
      });
  }, 1000);
};

changeFirebasePassword = newPassword => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    firebase
      .auth()
      .currentUser.updatePassword(newPassword)
      .then(() => {
        dispatch(loading(false));
        dispatch(modalVisiblePassword(false));

        setTimeout(() => {
          dispatch({
            type: "USER_VALIDATION",
            payload: {}
          });
          dispatch({
            type: "CHANGE_PASSWORD_VALID",
            payload: ""
          });
          dispatch(alertUser("Sucesso", "Senha Editada com sucesso"));
          dispatch(getUser());
        }, 1000);
      })
      .catch(error => {
        dispatch(loading(false));
        dispatch(modalVisiblePassword(false));

        setTimeout(() => {
          dispatch({
            type: "USER_VALIDATION",
            payload: {}
          });
          dispatch({
            type: "CHANGE_PASSWORD_VALID",
            payload: ""
          });
          dispatch(alertUser("Sucesso", "Senha Editada com sucesso"));
          dispatch(getUser());
        }, 1000);
      });
  }, 1000);
};

export const loading = flag => {
  return {
    type: "CHANGED_LOADING",
    payload: flag
  };
};

export const cardEdit = id => dispatch => {
  if (id !== "new") {
    AsyncStorage.getItem("CurrentUser").then(userID => {
      firebase
        .database()
        .ref(`users/${userID}/cards/${id}`)
        .once("value")
        .then(snapshot => {
          dispatch({
            type: "GET_CARD_EDIT",
            payload: { ...snapshot._value, key: snapshot.key }
          });
        })
        .then(() => {
          dispatch({
            type: "KEY_CARD_OPERATOR",
            payload: id
          });
        })
        .then(() => {
          dispatch({
            type: "OPERATION_EDIT_CARD",
            payload: "updateCard"
          });
        })
        .then(() => {
          dispatch(getMainCard());

          dispatch(
            NavigationActions.navigate({
              routeName: "EditCard"
            })
          );
        });
    });
  } else {
    dispatch({
      type: "GET_CARD_EDIT",
      payload: {
        cvv: "",
        date: "",
        flag: "",
        num: "",
        name: ""
      }
    });

    dispatch({
      type: "OPERATION_EDIT_CARD",
      payload: "saveCard"
    });

    dispatch(getMainCard());

    dispatch(
      NavigationActions.navigate({
        routeName: "EditCard"
      })
    );
  }
};

export const saveCard = cards => dispatch => {
  if (
    cards.num.length &&
    cards.date.length &&
    cards.cvv.length &&
    cards.name.length
  ) {
    AsyncStorage.getItem("CurrentUser").then(userId => {
      firebase
        .database()
        .ref("users/" + userId + "/cards/")
        .push({
          cvv: cards.cvv,
          date: cards.date,
          flag: cards.flag,
          num: cards.num,
          name: cards.name
        })
        .then(() => {
          dispatch(loading(false));
          dispatch(NavigationActions.back());
        })
        .then(() => {
          dispatch(getCardsUser());
        })
        .catch(error => {
          console.log(error);
        });
    });
  } else {
    dispatch(loading(false));
    setTimeout(() => {
      dispatch(Alert.alert("Erro", "Por favor digite os dados do cartão"));
    }, 100);
  }
};

export const updateCard = cards => (dispatch, getState) => {
  let key = getState().user.operatorCardkey;

  if (
    cards.num.length &&
    cards.date.length &&
    cards.cvv.length &&
    cards.name.length
  ) {
    AsyncStorage.getItem("CurrentUser").then(userId => {
      firebase
        .database()
        .ref("users/" + userId + "/cards/" + key)
        .update({
          cvv: cards.cvv,
          date: cards.date,
          flag: cards.flag,
          num: cards.num,
          name: cards.name
        })
        .then(() => {
          dispatch(loading(false));
          dispatch(NavigationActions.back());
        })
        .then(() => {
          dispatch(getCardsUser());
        })
        .catch(error => {
          console.log(error);
        });
    });
  } else {
    dispatch(loading(false));
    setTimeout(() => {
      dispatch(Alert.alert("Erro", "Por favor digite os dados do cartão"));
    }, 100);
  }
};

export const getMainCard = () => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/mainCard`)
      .once("value")
      .then(snapshot => {
        dispatch({
          type: "GET_MAIN_CARD",
          payload: snapshot._value
        });
      });
  });
};

export const setMainCard = mainCard => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/mainCard`)
      .once("value")
      .then(snapshot => {
        currentCard = snapshot._value;
        let newCard = mainCard == currentCard ? "" : mainCard;

        firebase
          .database()
          .ref("users/" + userID)
          .update({
            mainCard: newCard
          })
          .then(() => {
            if (newCard != "") {
              Alert.alert("Cartão definido como principal");
            } else {
              Alert.alert("Cartão removido como principal");
            }

            dispatch({
              type: "CHANGED_MAIN_CARD"
            });
          })
          .then(() => {
            dispatch(getMainCard());
          })
          .catch(error => {
            console.log(error);
          });
      });
  });
};

export const validateNameCard = value => dispatch => {
  dispatch({
    type: "CHANGED_NAME_CARD",
    payload: value
  });
};

export const validateNumberCard = value => dispatch => {
  if (value.length == 4 || value.length == 9 || value.length == 14) {
    value += " ";
  }

  if (value.length == 19) {
    const numberValidation = CardValidator.number(value);

    if (!numberValidation.isPotentiallyValid) {
      dispatch({
        type: "SET_FLAG_CARD",
        payload: ""
      });

      dispatch(
        alertUser(
          "Cartão invalido",
          "Por favor, confira se os dados do cartão estão corretos"
        )
      );
    }

    if (numberValidation.card) {
      dispatch({
        type: "SET_FLAG_CARD",
        payload: numberValidation.card.niceType
      });
    }
  }

  dispatch({
    type: "CHANGED_CARD",
    payload: value
  });
};

export const validateDateCard = value => dispatch => {
  if (value.length == 2) {
    value += "/";
  }

  if (value.length == 5) {
    const numberValidation = CardValidator.expirationDate(value);

    if (!numberValidation.isPotentiallyValid) {
      dispatch({
        type: "CHANGED_DATE_CARD",
        payload: ""
      });
      dispatch(
        alertUser(
          "Data invalida",
          "Por favor, confira se os dados do cartão estão corretos"
        )
      );
    }
  }

  dispatch({
    type: "CHANGED_DATE_CARD",
    payload: value
  });
};

export const validateCvvCard = value => dispatch => {
  if (value.length == 3) {
    const numberValidation = CardValidator.cvv(value);

    if (!numberValidation.isPotentiallyValid) {
      dispatch({
        type: "CHANGED_CVV_CARD",
        payload: ""
      });
      dispatch(
        alertUser(
          "Código invalido",
          "Por favor, confira se os dados do cartão estão corretos"
        )
      );
    }
  }

  dispatch({
    type: "CHANGED_CVV_CARD",
    payload: value
  });
};

alertUser = (title, text) => {
  Alert.alert(title, text);
  return {
    type: "ALERT_USER"
  };
};
