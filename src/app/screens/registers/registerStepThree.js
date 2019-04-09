// React
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Platform
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TitleCard from "../../components/cards/cardTitle";
import BtnPrimary from "../../components/buttons/btnPrimary";
import IconLeft from "../../components/buttons/iconLeft";

// Actions
import {
  validateNumberCard,
  validateDateCard,
  validateCvvCard,
  validateNameCard,
  saveCard
} from "../../actions/RegisterActions";
import { getFontSize } from "../../actions/UserActions";
import Input from "../../components/input";

class RegisterStepThree extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <IconLeft navigation={navigation} type="dark" />
  });

  componentDidMount() {
    this.props.getFontSize();
  }

  render() {
    const { cards } = this.props.register;

    return (
      // <KeyboardAvoidingView
      //   keyboardVerticalOffset={Platform.OS == "android" ? -500 : 0}
      //   behavior="padding"
      //   enabled
      //   style={{ flex: 1 }}
      // >
      <ScrollView>
        <View style={styles.main}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <View style={styles.container}>
            <TitleCard
              text="MÉTODO DE PAGAMENTO"
              offset="3"
              limit="3"
              style={styles.titles}
            />

            <View style={styles.row}>
              <View style={styles.formGroupFull}>
                <Text style={styles.label}>NÚMERO DO CARTÃO</Text>

                <Input
                  widthInput={290}
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="#2B2B2B"
                  keyboardType="numeric"
                  maxLength={19}
                  onChangeText={value => this.props.validateNumberCard(value)}
                  value={cards.num}
                />

                {cards.flag != "" && (
                  <Text style={styles.flag}>{cards.flag}</Text>
                )}
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>DATA DE VALIDADE</Text>

                <Input
                  widthInput={100}
                  style={styles.input}
                  placeholder="00 / 00"
                  placeholderTextColor="#2B2B2B"
                  keyboardType="numeric"
                  maxLength={5}
                  onChangeText={value => this.props.validateDateCard(value)}
                  value={cards.date}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}> CÓDIGO DE ACESSO</Text>

                <Input
                  widthInput={100}
                  style={styles.input}
                  placeholder="000"
                  placeholderTextColor="#2B2B2B"
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={value => this.props.validateCvvCard(value)}
                  value={cards.cvv}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.formGroupFull}>
                <Text style={styles.label}>NOME IGUAL DO CARTÃO</Text>

                <Input
                  widthInput={290}
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor="#2B2B2B"
                  onChangeText={value => this.props.validateNameCard(value)}
                  value={cards.name}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => this.props.saveCard(cards)}>
              <BtnPrimary text="ADICIONAR MÉTODO DE PAGAMENTO" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("RegisterStepFour")}
            >
              <Text style={styles.TextGray}>PULAR ESTA ETAPA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 50,
    height: Dimensions.get("window").height
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
    marginTop: 10
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 10
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
    fontFamily: "Poppins-Medium",
    marginVertical: 10
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
    lineHeight: 48,
    textAlign: "center",
    fontSize: 10
  },

  image: {
    opacity: 0.2
  },

  buttons: {
    marginTop: 20,
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
    right: 10
  },

  input: {
    width: 100,
    borderColor: "#C9C9C9",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    fontSize: 20,
    color: "#2B2B2B",
    fontFamily: "Poppins-Regular"
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
      getFontSize
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterStepThree);
