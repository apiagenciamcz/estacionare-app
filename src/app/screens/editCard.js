// React
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Switch
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import BtnPrimary from "../components/buttons/btnPrimary";
import IconLeft from "../components/buttons/iconLeft";

// Actions
import {
  saveCard,
  updateCard,
  validateNumberCard,
  validateDateCard,
  validateCvvCard,
  validateNameCard,
  getFontSize,
  setMainCard
} from "../actions/UserActions";
import Input from "../components/input";

let { height } = Dimensions.get("window");

class EditCard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    title: "MÉTODO DE PAGAMENTO",
    headerLeft: <IconLeft navigation={navigation} type="dark" />
  });

  render() {
    const { cardEdit, operatorCardEdit, fontSize, mainCard } = this.props.user;

    console.log(mainCard);

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == "android" ? -500 : 0}
        behavior="padding"
        enabled
        style={styles.main}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <ScrollView>
          <View
            style={{
              marginTop: 30,
              alignItems: "stretch",
              justifyContent: "space-between"
            }}
          >
            <View style={{ height: height - 200 }}>
              <View style={styles.row}>
                <View style={styles.formGroupFull}>
                  <Text style={[styles.label, { fontSize: 10 * fontSize }]}>
                    NÚMERO DO CARTÃO
                  </Text>

                  <Input
                    widthInput={290}
                    style={[styles.input, { fontSize: 20 * fontSize }]}
                    placeholder="0000 0000 0000 0000"
                    placeholderTextColor="#2B2B2B"
                    maxLength={19}
                    onChangeText={value => this.props.validateNumberCard(value)}
                    value={cardEdit.num}
                  />

                  {cardEdit.flag != "" && (
                    <Text style={[styles.flag, { fontSize: 12 * fontSize }]}>
                      {cardEdit.flag}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.formGroup}>
                  <Text style={[styles.label, { fontSize: 10 * fontSize }]}>
                    DATA DE VALIDADE
                  </Text>

                  <Input
                    widthInput={100}
                    style={[styles.input, { fontSize: 20 * fontSize }]}
                    placeholder="00 / 00"
                    placeholderTextColor="#2B2B2B"
                    maxLength={5}
                    onChangeText={value => this.props.validateDateCard(value)}
                    value={cardEdit.date}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={[styles.label, { fontSize: 10 * fontSize }]}>
                    CVV
                  </Text>

                  <Input
                    widthInput={100}
                    style={[styles.input, { fontSize: 20 * fontSize }]}
                    placeholder="000"
                    placeholderTextColor="#2B2B2B"
                    maxLength={3}
                    onChangeText={value => this.props.validateCvvCard(value)}
                    value={cardEdit.cvv}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.formGroupFull}>
                  <Text style={[styles.label, { fontSize: 10 * fontSize }]}>
                    NOME IGUAL DO CARTÃO
                  </Text>

                  <Input
                    widthInput={290}
                    style={[styles.input, { fontSize: 20 * fontSize }]}
                    placeholder=""
                    placeholderTextColor="#2B2B2B"
                    onChangeText={value => this.props.validateNameCard(value)}
                    value={cardEdit.name}
                  />
                </View>
              </View>

              <View style={styles.formControl}>
                <Text style={styles.label}>
                  Definir como cartão principal ?
                </Text>

                <Switch
                  value={mainCard == cardEdit.key ? true : false}
                  onValueChange={() => this.props.setMainCard(cardEdit.key)}
                />
              </View>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.props[operatorCardEdit](cardEdit)}
              >
                <BtnPrimary text="ADICIONAR MÉTODO DE PAGAMENTO" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
    paddingTop: 50
  },

  title: {
    color: "#2B2B2B",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins-Semibold"
  },

  container: {
    marginTop: 30
  },

  formGroup: {
    marginLeft: 18,
    marginRight: 18
  },

  formGroupFull: {
    width: "80%",
    marginLeft: 18,
    marginRight: 18,
    position: "relative"
  },

  rowFull: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    marginTop: 20
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 20
  },

  ViewBrown: {
    backgroundColor: "#3A1A00",
    marginBottom: 13,
    width: 300,
    height: 62,
    borderRadius: 62
  },

  TextBrown: {
    color: "#F49810",
    textAlign: "center",
    fontFamily: "Poppins-Medium"
  },

  TextGray: {
    color: "#6E6E6E",
    textAlign: "center",
    fontFamily: "Poppins-Medium"
  },

  addBoard: {
    backgroundColor: "#FFE3B9",
    marginBottom: 13,
    height: 48,
    borderRadius: 48,
    marginTop: 100
  },

  TextAddBoard: {
    color: "#2B2B2B",
    textAlign: "center",
    fontSize: 10
  },

  image: {
    opacity: 0.2
  },

  buttons: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },

  label: {
    fontSize: 10,
    marginBottom: 18,
    fontFamily: "Poppins-SemiBold"
  },

  flag: {
    fontSize: 12,
    color: "#888888",
    fontFamily: "Poppins-Italic",
    position: "absolute",
    top: 40,
    right: -25
  },

  input: {
    width: "100%",
    borderColor: "#C9C9C9",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    fontSize: 20,
    color: "#2B2B2B",
    fontFamily: "Poppins-Regular"
  },

  formControl: {
    marginTop: 19,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12
  },

  label: {
    color: "#2B2B2B",
    fontSize: 13,
    fontFamily: "Poppins-SemiBold"
  }
});

const mapStateToProps = state => ({
  register: state.register,
  user: state.user
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      validateNumberCard,
      validateDateCard,
      validateCvvCard,
      validateNameCard,
      saveCard,
      updateCard,
      getFontSize,
      setMainCard
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard);
