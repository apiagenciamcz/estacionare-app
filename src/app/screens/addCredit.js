import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Picker,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import BtnPrimary from "../components/buttons/btnPrimary";
import IconLeft from "../components/buttons/iconLeft";

import {
  init,
  addValue,
  modalVisibleCard,
  saveSelect
} from "../actions/MoneyActions";
import Input from "../components/input";

class AddCredit extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <IconLeft navigation={navigation} type="light" />
  });

  componentDidMount() {
    console.log(this.props);
    this.props.init();
  }

  render() {
    const width =
      Dimensions.get("window").width - Dimensions.get("window").width * 0.254;
    const { fontSize } = this.props.user;
    const { outherValue } = this.props.money;
    const cards = this.props.money.cards || [];
    return (
      <ImageBackground
        source={require("../images/background.png")}
        style={styles.container}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS == "android" ? -500 : 0}
          behavior="padding"
          enabled
          style={{ flex: 1 }}
        >
          <ScrollView>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <View style={styles.cardWhite}>
              <Text style={styles.title}>ADICIONAR SALDO</Text>

              <View style={styles.containerNumber}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.props.addValue(20)}
                >
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "center", fontSize: 13 * fontSize }
                    ]}
                  >
                    R$ 20,00
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.props.addValue(50)}
                >
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "center", fontSize: 13 * fontSize }
                    ]}
                  >
                    R$ 50,00
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.props.addValue(100)}
                >
                  <Text
                    style={[
                      styles.text,
                      { textAlign: "center", fontSize: 13 * fontSize }
                    ]}
                  >
                    R$ 100,00
                  </Text>
                </TouchableOpacity>

                <View>
                  <Input
                    center
                    widthInput={width}
                    value={outherValue}
                    keyboardType="numeric"
                    onChangeText={outherValue =>
                      this.props.addValue(outherValue)
                    }
                    placeholder="OUTRO VALOR"
                    placeholderTextColor="#2B2B2B"
                  />
                </View>
              </View>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.props.modalVisibleCard("visible")}
                disabled={this.props.money.current > 0 ? false : true}
              >
                <BtnPrimary text="CONFIRMAR COMPRA " />
              </TouchableOpacity>
            </View>
            <Modal
              onRequestClose={() => null}
              animationType="slide"
              transparent={true}
              visible={
                this.props.money.visibleCards == "visible" ? true : false
              }
            >
              <View style={styles.modalContainer}>
                <View style={styles.buttonContainer}>
                  <Text
                    style={{ color: "gray" }}
                    onPress={() => this.props.modalVisibleCard("hidden")}
                  >
                    Fechar
                  </Text>
                </View>
                <View style={styles.picker}>
                  <Picker
                    // selectedValue={this.props.money.cardSelect}
                    onValueChange={itemValue =>
                      itemValue != 0
                        ? this.props.saveSelect(
                            itemValue,
                            this.props.money.current
                          )
                        : null
                    }
                  >
                    <Picker.Item label="Selecione seu cartão" value={0} />

                    {cards &&
                      Object.values(cards).map((i, index) => (
                        <Picker.Item key={index} label={i.name} value={i.num} />
                      ))}
                  </Picker>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    height: Dimensions.get("window").height
  },

  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center"
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  buttons: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },

  cardWhite: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    paddingBottom: 35
  },

  text: {
    color: "#2B2B2B",
    fontSize: 13
  },

  btn: {
    paddingHorizontal: 30,
    height: 60,
    borderColor: "#C9C9C9",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center"
  },

  containerNumber: {
    alignItems: "stretch"
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },

  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#ffffff"
  },

  picker: {
    backgroundColor: "#ffffff"
  }
});

const mapStateToProps = state => ({
  money: state.money,
  user: state.user
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addValue, init, modalVisibleCard, saveSelect },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCredit);
