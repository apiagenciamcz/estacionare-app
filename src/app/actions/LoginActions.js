import { AsyncStorage, Alert } from "react-native";
import firebase from "react-native-firebase";
import { NavigationActions } from "react-navigation";

import { AccessToken, LoginManager } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";

export const handleLogin = (email, password) => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        const currentUser = user._user.uid;
        AsyncStorage.setItem("LoggedUser", "true").then(() => {
          AsyncStorage.setItem("CurrentUser", currentUser).then(() => {
            dispatch(
              NavigationActions.navigate({
                routeName: "Home"
              })
            );

            dispatch(loading(false));
          });
        });
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(loading(false));
          setTimeout(() => {
            Alert.alert(
              "E-mail ou senha incorretos",
              "Por favor informe os dados cadastrados"
            );
          }, 100);
        }, 1000);
      });
  }, 1000);
};

export const loginFacebook = () => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {
        dispatch(loading(false));
        if (result.isCancelled) {
          return Promise.reject(new Error("Usuario cancelou requisicao"));
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then(async data => {
        const credential = await firebase.auth.FacebookAuthProvider.credential(
          data.accessToken
        );
        console.log(credential, "credential");
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            const currentUser = user._user.uid;
            console.log(currentUser);
            firebase
              .database()
              .ref(`users/${currentUser}`)
              .once("value")
              .then(snapshot => {
                console.log("snapshot", snapshot);
                if (snapshot.val() != null) {
                  AsyncStorage.setItem("LoggedUser", "true").then(() => {
                    AsyncStorage.setItem("CurrentUser", currentUser).then(
                      () => {
                        setTimeout(() => {
                          dispatch(
                            NavigationActions.navigate({
                              routeName: "Home"
                            })
                          );
                          dispatch(loading(false));
                        }, 1000);
                      }
                    );
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
          });
      })

      .catch(error => {
        console.log(error);
      });
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

export const loginGoogle = () => dispatch => {
  dispatch(loading(true));

  setTimeout(() => {
    GoogleSignin.signIn()
      .then(data => {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            const currentUser = user._user.uid;

            firebase
              .database()
              .ref(`users/${currentUser}`)
              .once("value")
              .then(snapshot => {
                if (snapshot.val() != null) {
                  AsyncStorage.setItem("LoggedUser", "true").then(() => {
                    AsyncStorage.setItem("CurrentUser", currentUser).then(
                      () => {
                        dispatch(loading(false));
                        setTimeout(() => {
                          dispatch(
                            NavigationActions.navigate({
                              routeName: "Home"
                            })
                          );
                        }, 1000);
                      }
                    );
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
          });
      })
      .then(user => {
        const currentUser = user._user.uid;
        console.log(user);

        firebase
          .database()
          .ref(`users/${currentUser}`)
          .once("value")
          .then(snapshot => {
            if (snapshot.val() != null) {
              AsyncStorage.setItem("LoggedUser", "true").then(() => {
                AsyncStorage.setItem("CurrentUser", currentUser).then(() => {
                  dispatch(loading(false));
                  setTimeout(() => {
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
      })
      .catch(error => {
        console.log(error);
      })
      .done(() => {
        dispatch(loading(false));
      });
  }, 1000);
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
