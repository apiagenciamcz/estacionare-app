import { Alert, AsyncStorage } from "react-native";
import firebase from "react-native-firebase";

import { NavigationActions } from "react-navigation";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import CardValidator from "card-validator";
import { loginFacebook } from "../actions/LoginActions";
// Create an account using the email/password method
export const handleCreateLogin = (
  email,
  password,
  confirmePassword
) => dispatch => {
  if (email.length && password.length && confirmePassword.length) {
    console.log(email, password, confirmePassword);
    if (confirmePassword == password) {
      dispatch(loading(true));

      setTimeout(() => {
        firebase
          .auth()
          .createUserAndRetrieveDataWithEmailAndPassword(email, password)
          .then(value => {
            const currentUser = value.user._user.uid;
            AsyncStorage.setItem("CurrentUser", currentUser).then(() => {
              dispatch(
                NavigationActions.navigate({
                  routeName: "RegisterAcceptTermsUse"
                })
              );
              dispatch(loading(false));
            });
          })
          .catch(error => {
            if (error.code == "auth/weak-password") {
              setTimeout(() => {
                dispatch(loading(false));
                setTimeout(() => {
                  Alert.alert("Erro", "Por favor, digite uma senha mais forte");
                }, 100);
              }, 1000);
            } else if (error.code == "auth/invalid-email") {
              setTimeout(() => {
                dispatch(loading(false));
                setTimeout(() => {
                  Alert.alert("Erro", "Por favor, digite um e-mail valido");
                }, 100);
              }, 1000);
            } else if (error.code == "auth/email-already-in-use") {
              setTimeout(() => {
                dispatch(loading(false));
                setTimeout(() => {
                  Alert.alert("Erro", "Este e-mail já está em uso");
                }, 100);
              }, 1000);
            }
          });
      }, 1000);
    } else {
      dispatch(alertError());
    }
  } else {
    dispatch(alertError());
  }
};

export const alertError = () => {
  Alert.alert("Erro com a senha", "As senhas não conferem");
  return {
    type: "error"
  };
};

// Create an account using the Facebook method
export const handlerCreateFacebook = () => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {
        dispatch(loading(false));
        if (result.isCancelled) {
          return Promise.reject(new Error("Usuario cancelou requisicao"));
        }
        console.log(result.grantedPermissions.toString());
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        console.log(data);
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken
        );
        console.log(credential, "credential");

        dispatch({
          type: "CHANGED_NAME",
          payload: data.name
        });

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(async current => {
            console.log(current);
            if (current.additionalUserInfo.isNewUser) {
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(user => {
                  console.log(user, "USERRR");
                  const currentUser = user._user.uid;
                  AsyncStorage.setItem("CurrentUser", currentUser).then(() => {
                    dispatch(loading(false));
                    dispatch(
                      NavigationActions.navigate({
                        routeName: "RegisterAcceptTermsUse"
                      })
                    );
                  });
                });
            } else {
              try {
                firebase
                  .database()
                  .ref(`users/${current.user._user.uid}`)
                  .once("value")
                  .then(snapshot => {
                    console.log("snapshot", snapshot);
                    if (snapshot.val() != null) {
                      AsyncStorage.setItem("LoggedUser", "true").then(() => {
                        AsyncStorage.setItem(
                          "CurrentUser",
                          current.user._user.uid
                        ).then(() => {
                          setTimeout(() => {
                            dispatch(loading(false));
                            dispatch(
                              NavigationActions.navigate({
                                routeName: "Home"
                              })
                            );
                          }, 1000);
                        });
                      });
                    } else {
                      setTimeout(() => {
                        dispatch(loading(false));
                        setTimeout(() => {
                          Alert.alert(
                            "Ops, algo deu errado",
                            "Não encontramos suas credenciais no nosso sistema, por favor cadastre-se para realizar o login!"
                          );
                        }, 100);
                      }, 1000);
                    }
                  });
              } catch (err) {
                console.log("errVagab", err);
              }
            }
          })
          .catch(err => {
            console.log("errr", err);
          });
      });
    // .then(currentUser => {
    //   const user = currentUser._user.uid;
    //   AsyncStorage.setItem("CurrentUser", user).then(() => {
    //     dispatch(loading(false));
    //     dispatch(
    //       NavigationActions.navigate({
    //         routeName: "RegisterAcceptTermsUse"
    //       })
    //     );
    //   });
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }, 1000);
};

export const loginGoogleConfigure = () => dispatch => {
  GoogleSignin.configure({
    iosClientId:
      "307321601096-jpocbm5rtt137d4mgpkdi03troq82rb0.apps.googleusercontent.com", // only for iOS
    androidClientId:
      "307321601096-7o2jnm2kpgg3318ri9d1ok3qhinbbhnj.apps.googleusercontent.com" // only for ANDROID
  }).then(() => {
    console.log("CONFIGURED_GOOGLE_SIGN");
    dispatch({
      type: "CONFIGURED_GOOGLE_SIGN"
    });
  });
};

// Create an account using the Gmail/Google method
export const handlerCreateGoogle = () => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    GoogleSignin.signIn()
      .then(data => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );

        dispatch({
          type: "CHANGED_NAME",
          payload: data.name
        });

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            const currentUser = user._user.uid;
            AsyncStorage.setItem("CurrentUser", currentUser).then(() => {
              dispatch(loading(false));
              dispatch(
                NavigationActions.navigate({
                  routeName: "RegisterAcceptTermsUse"
                })
              );
            });
          });
      })
      .then(user => {
        console.log(user);
        const currentUser = user._user.uid;
        AsyncStorage.setItem("CurrentUser", currentUser).then(() => {
          dispatch(loading(false));
          dispatch(
            NavigationActions.navigate({
              routeName: "RegisterAcceptTermsUse"
            })
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, 1000);
};

// Save checking 'Terms Of Use' on user profile
export const saveTermsOfUse = () => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    AsyncStorage.getItem("CurrentUser").then(userId => {
      firebase
        .database()
        .ref("users/" + userId)
        .update({
          termsOfUse: true,
          fontSize: 1
        })
        .then(() => {
          dispatch(loading(false));
          dispatch(
            NavigationActions.navigate({
              routeName: "RegisterStepTwo"
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
    });
  }, 1000);
};

export const addLicensePlate = (cars, boardCar, key) => {
  const carsClone = cars;
  boardCar = boardCar.length == 3 ? boardCar + "-" : boardCar;
  carsClone[key].name = boardCar;
  return {
    type: "CHANGE_CARS",
    payload: carsClone
  };
};

export const addInputLicensePlate = (cars, totalCars) => {
  if (totalCars == 3) {
    return {
      type: "DISABLING_ADD_CAR",
      payload: true
    };
  } else {
    cars.push({ name: "", value: "" });
    return [
      {
        type: "CHANGE_CARS",
        payload: cars
      },
      {
        type: "CHANGE_TOTAL_CARS",
        payload: totalCars + 1
      }
    ];
  }
};

export const deleteLicensePlate = (cars, totalCars, index) => dispatch => {
  cars.splice(index, 1);

  dispatch({
    type: "CHANGE_TOTAL_CARS",
    payload: totalCars - 1
  });

  dispatch({
    type: "CHANGE_CARS",
    payload: cars
  });

  if (totalCars <= 3) {
    dispatch({
      type: "DISABLING_ADD_CAR",
      payload: false
    });
  }
};

export const saveUserAndCars = (name, cars, pcd) => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    if (name.length) {
      AsyncStorage.getItem("CurrentUser").then(userId => {
        firebase
          .database()
          .ref("users/" + userId)
          .update({
            pcd: pcd,
            name: name,
            cars: cars,
            notifications: {
              beeps: false,
              vibration: false,
              parkingMeterAlert: false
            }
          })
          .then(() => {
            dispatch(loading(false));
            dispatch(
              NavigationActions.navigate({
                routeName: "RegisterStepThree"
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
      });
    } else {
      dispatch(loading(false));

      setTimeout(() => {
        dispatch(alertUser("Erro", "Por favor, digite seu nome"));
      }, 100);
    }
  }, 1000);
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

export const saveCard = cards => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    if (
      cards.num.length &&
      cards.date.length &&
      cards.cvv.length &&
      cards.name.length
    ) {
      AsyncStorage.getItem("CurrentUser").then(userId => {
        firebase
          .database()
          .ref("users/" + userId + "/cards")
          .push({
            cvv: cards.cvv,
            date: cards.date,
            flag: cards.flag,
            num: cards.num,
            name: cards.name
          })
          .then(() => {
            dispatch(loading(false));
            dispatch(
              NavigationActions.navigate({
                routeName: "RegisterStepFour"
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
      });
    } else {
      dispatch(loading(false));
      setTimeout(() => {
        dispatch(alertUser("Erro", "Por favor digite os dados do cartão"));
      }, 100);
    }
  }, 1000);
};

export const setCPF = text => {
  v = text.replace(/\D/g, "");

  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return {
    type: "CHANGE_CPF",
    payload: v
  };
};

export const setText = (text, action) => {
  return {
    type: action,
    payload: text
  };
};

export const loading = flag => {
  return {
    type: "CHANGED_LOADING",
    payload: flag
  };
};

alertUser = (title, text) => {
  Alert.alert(title, text);
  return {
    type: "ALERT_USER"
  };
};

export const changeTypeAccount = typeAccount => {
  return {
    type: "CHANGED_TYPE_ACCOUNT",
    payload: typeAccount
  };
};

export const saveTypeAccount = typeAccount => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    AsyncStorage.setItem("LoggedUser", "true").then(() => {
      AsyncStorage.getItem("CurrentUser").then(userId => {
        let now = new Date();

        firebase
          .database()
          .ref("users/" + userId + "/account")
          .push({
            type: typeAccount,
            status: "valid",
            date: {
              first: now,
              last: new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                now.getDate()
              )
            }
          })
          .then(() => {
            dispatch(loading(false));
            dispatch(
              NavigationActions.navigate({
                routeName: "Confirm"
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  }, 1000);
};
