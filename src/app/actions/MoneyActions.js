import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import axios from "axios";

export const addValue = current => {
  return {
    type: "CHANGED_CURRENT",
    payload: Number(current)
  };
};

export const init = () => {
  return [
    getCardsUser(),
    {
      type: "CHANGED_CURRENT",
      payload: 14.0
    }
  ];
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

export const saveSelect = (card, value) => dispatch => {
  dispatch({
    type: "MODAL_VISIBLE_CARDS",
    payload: "hidden"
  });

  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}/credit`)
      .once("value")
      .then(snapshot => {
        let credit = snapshot._value + value;

        dispatch({
          type: "SAVE_CREDIT",
          payload: credit
        });
      })
      .then(() => {
        let receiptCredit = {
          value: value,
          type: "credit",
          card: card,
          date: new Date()
        };

        dispatch({
          type: "GENERATE_RECEIPT",
          payload: receiptCredit
        });
      })
      .then(() => {
        console.log("test");
        dispatch(
          NavigationActions.navigate({
            routeName: "ReceiptCredit"
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const formatDate = data => {
  const date = new Date(data);
  day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  month =
    date.getDate() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;

  return `${day}/${month}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
};

export const generateReceipt = (credit, item) => dispatch => {
  AsyncStorage.getItem("CurrentUser").then(userID => {
    firebase
      .database()
      .ref(`users/${userID}`)
      .update({
        credit
      })
      .then(() => {
        AsyncStorage.getItem("CurrentUser").then(userID => {
          firebase
            .database()
            .ref("users/" + userID + "/receipts/credit")
            .push({
              item
            })
            .then(() => {
              firebase.auth().onAuthStateChanged(function(user) {
                const { card, date, value } = item;

                const sendMail = {
                  title: "COMPROVANTE DE RECARGA DE CRÉDITO",
                  user: {
                    name: user._user.displayName,
                    email: user._user.email
                  },
                  items: [
                    {
                      label: "Saldo",
                      value: card
                    },
                    {
                      label: "Data",
                      value: formatDate(date)
                    },
                    {
                      label: "Total",
                      value: `R$ ${value},00`
                    }
                  ]
                };

                axios
                  .post(
                    "http://projetos.agenciazbra.com/estaciomobidashboard/mail/receipt",
                    sendMail
                  )
                  .then(function(response) {
                    console.log(response.data);
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              });
            })
            .then(() => {
              dispatch(changeStateFlag(true));
              dispatch(
                NavigationActions.navigate({
                  routeName: "Home"
                })
              );
            })
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export const modalVisibleCard = oper => {
  return {
    type: "MODAL_VISIBLE_CARDS",
    payload: oper
  };
};

export const changeStateFlag = flag => {
  return {
    type: "STATUS_CREDIT",
    payload: flag
  };
};
