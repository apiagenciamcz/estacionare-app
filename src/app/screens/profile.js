import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Slider,
  Platform,
  Alert
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  changeTextOper,
  saveEditCar,
  getFontSize,
  deleteEditCar,
  getUser,
  getCarsUser,
  saveName,
  changeEmail,
  changePassword,
  textConfirmPassword,
  saveConfirmPassword,
  modalVisiblePassword,
  addCar,
  changeOper,
  updateFontSize
} from "../actions/UserActions";

import Header from "../components/template/header";
import Loading from "../components/template/loading";
import FontAwesome, { Icons } from "react-native-fontawesome";
import Input from "../components/input";

class Profile extends Component {
  static navigationOptions = () => ({
    title: "PERFIL"
  });
  state = {
    car: 0
  };
  componentDidMount() {
    this.props.getUser();
    this.props.getCarsUser();
    this.props.getFontSize();
  }
  addCar() {
    if (Object.keys(this.props.user.cars).length < 3) {
      this.props.addCar();
    } else {
      Alert.alert("Erro", "Você pode inserir apenas 3 Veículos");
    }
  }
  render() {
    const { loading, cars, fontSize, name } = this.props.user;

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == "android" ? -500 : 0}
        behavior="padding"
        enabled
        style={styles.container}
      >
        <ScrollView>
          <StatusBar backgroundColor="black" barStyle="dark-content" />
          <Header navigation={this.props.navigation} title="PERFIL" />
          <Loading loading={loading} />

          <View>
            <View style={styles.infos}>
              <View style={styles.formControl}>
                <Text style={[styles.label, { fontSize: 10 * fontSize }]}>
                  NOME
                </Text>
                <Input
                  style={[styles.inputName, { fontSize: 24 * fontSize }]}
                  value={name}
                  onChangeText={name => this.props.saveName(name)}
                  placeholder="Nome"
                  placeholderTextColor="#2B2B2B"
                />
              </View>

              <View style={styles.formControl}>
                <Text style={[styles.label, { fontSize: 10 * fontSize }]}>
                  SENHA
                </Text>
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  style={[styles.input, { fontSize: 14 * fontSize }]}
                  placeholder="Senha"
                  onChangeText={password => this.props.changePassword(password)}
                  onEndEditing={() => this.props.modalVisiblePassword(true)}
                  placeholderTextColor="#2B2B2B"
                />
              </View>

              <View style={styles.formControl}>
                <Text style={[styles.label, { fontSize: 10 * fontSize }]}>
                  TAMANHO DE FONTES
                </Text>
                <Slider
                  minimumValue={1}
                  maximumValue={1.4}
                  step={0.1}
                  value={fontSize}
                  onValueChange={size => this.props.updateFontSize(size)}
                />
              </View>
            </View>

            <View style={styles.cars}>
              <Text style={styles.titleCars}>MEUS CARROS</Text>

              {cars &&
                Object.keys(cars).map(index => {
                  let item = cars[index];

                  return (
                    <View style={styles.itemCar} key={index}>
                      <Input
                        widthInput={140}
                        maxLength={7}
                        onFocus={() => this.props.changeOper(index, true)}
                        onChangeText={text => {
                          this.props.changeTextOper(index, text);
                        }}
                        placeholder="Digite sua placa"
                        //  style={[styles.plateCar, { fontSize: 14 * fontSize }]}
                        value={item.name}
                      />

                      {!item.activeOper && (
                        <Text
                          style={[styles.valCar, { fontSize: 12 * fontSize }]}
                        >
                          Total utilizado: R${" "}
                          {item.value ? item.value : "00,00"}
                        </Text>
                      )}
                      {item.activeOper && (
                        <View style={styles.boxEdit}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.saveEditCar(index, item.name)
                            }
                            style={[
                              styles.itemEditable,
                              { backgroundColor: "#8D8D8D" }
                            ]}
                          >
                            <FontAwesome style={styles.itemEditableIcon}>
                              {Icons.pencil}
                            </FontAwesome>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              this.props.deleteEditCar(index);
                              this.setState({ car: this.state.car-- });
                            }}
                            style={[
                              styles.itemEditable,
                              { backgroundColor: "#C12020" }
                            ]}
                          >
                            <FontAwesome style={styles.itemEditableIcon}>
                              {Icons.trashO}
                            </FontAwesome>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          </View>
          {this.state.car < 3 && (
            <View style={styles.buttons}>
              <View style={styles.ViewBrown}>
                <TouchableOpacity onPress={() => this.addCar()}>
                  <Text style={styles.TextBrown}>ADICIONAR NOVO CARRO</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Modal
            onRequestClose={() => null}
            animationType="slide"
            transparent={true}
            visible={this.props.user.visibleModalPassword}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.modalVisiblePassword(false)}
            >
              <View style={styles.modalContainer}>
                <View style={{ padding: 8, borderRadius: 8 }}>
                  <View style={styles.buttonContainer}>
                    <Text
                      style={{ color: "gray" }}
                      onPress={() => this.props.modalVisiblePassword(false)}
                    >
                      Fechar
                    </Text>
                  </View>
                  <View style={styles.picker}>
                    <View style={styles.formControl}>
                      <Text
                        style={{
                          color: "gray",
                          marginTop: 20,
                          textAlign: "center"
                        }}
                      >
                        Por favor digite sua senha para confirmar a ação!
                      </Text>

                      <Input
                        secureTextEntry
                        autoCapitalize="none"
                        style={[
                          styles.inputConfirm,
                          { fontSize: 14 * fontSize }
                        ]}
                        value={this.props.user.confirmePassword}
                        placeholder="* * *"
                        onChangeText={confirmePassword =>
                          this.props.textConfirmPassword(confirmePassword)
                        }
                        placeholderTextColor="#2B2B2B"
                      />

                      <View style={styles.buttons}>
                        <View style={styles.saveView}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.saveConfirmPassword(
                                this.props.user.confirmePassword
                              )
                            }
                          >
                            <Text style={styles.saveTextBrown}>
                              Salvar Ações
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  buttons: {
    height: 120,
    alignItems: "center",
    justifyContent: "center"
  },

  infos: {
    width: "100%"
  },

  formControl: {
    width: "100%",
    alignItems: "stretch",
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 12,
    paddingBottom: 12
  },

  label: {
    color: "#6E6E6E",
    fontSize: 10,
    fontFamily: "Poppins-SemiBold"
  },

  inputName: {
    fontSize: 24,
    color: "#2B2B2B",
    padding: 5,
    fontFamily: "Poppins-Bold"
  },

  input: {
    fontSize: 14,
    color: "#2B2B2B",
    padding: 8,
    fontFamily: "Poppins-Bold"
  },

  inputConfirm: {
    fontSize: 14,
    color: "#2B2B2B",
    padding: 8,
    fontFamily: "Poppins-Bold",
    borderColor: "#C9C9C9",
    borderBottomWidth: 1,
    textAlign: "center",
    marginTop: 20
  },

  cars: {
    backgroundColor: "#F0F0F0"
  },

  titleCars: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    padding: 20
  },

  itemCar: {
    paddingLeft: 20,
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },

  boxEdit: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  itemEditable: {
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center"
  },

  itemEditableIcon: {
    color: "#FFFFFF",
    fontSize: 20
  },

  plateCar: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    height: 70,
    flex: 1
  },

  valCar: {
    paddingHorizontal: 20,
    fontFamily: "Poppins-Regular",
    lineHeight: 50,
    fontSize: 12
  },

  ViewBrown: {
    backgroundColor: "#FFA015",
    marginBottom: 13,
    width: 300,
    height: 62,
    borderRadius: 62,
    marginTop: 13
  },

  TextBrown: {
    color: "#FFFFFF",
    lineHeight: 62,
    textAlign: "center",
    fontFamily: "Poppins-Medium"
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#ffffff"
  },

  picker: {
    backgroundColor: "#ffffff"
  },

  saveView: {
    backgroundColor: "#0EA9AC",
    marginBottom: 13,
    width: 260,
    height: 42,
    borderRadius: 42,
    marginTop: 20
  },

  saveTextBrown: {
    color: "#FFFFFF",
    lineHeight: 42,
    textAlign: "center",
    fontFamily: "Poppins-Medium"
  }
});

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUser,
      getCarsUser,
      saveName,
      changeEmail,
      changePassword,
      textConfirmPassword,
      saveConfirmPassword,
      modalVisiblePassword,
      addCar,
      changeOper,
      changeTextOper,
      saveEditCar,
      deleteEditCar,
      updateFontSize,
      getFontSize
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
