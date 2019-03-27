// React
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import WhiteCard from "../../components/cards/cardWhite";
import TitleCard from "../../components/cards/cardTitle";
import BtnPrimary from "../../components/buttons/btnPrimary";
import IconLeft from "../../components/buttons/iconLeft";
import Loading from "../../components/template/loading";
import FontAwesome, { Icons } from "react-native-fontawesome";

// Actions
import {
  addLicensePlate,
  deleteLicensePlate,
  addInputLicensePlate,
  setText,
  saveUserAndCars,
  setCPF
} from "../../actions/RegisterActions";
import { getFontSize } from "../../actions/UserActions";
import Input from "../../components/input";

class RegisterStepTwo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <IconLeft navigation={navigation} type="light" />
  });

  componentDidMount() {
    this.props.getFontSize();
  }

  render() {
    const {
      pcd,
      cars,
      name,
      cpf,
      oldMan,
      disableAddCar,
      totalCars,
      loading
    } = this.props.register;

    return (
      <ImageBackground
        source={require("../../images/background.png")}
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

            <Loading loading={loading} />

            <WhiteCard style={styles.card}>
              <TitleCard text="FINALIZAR CADASTRO" offset="2" limit="3" />

              <ScrollView style={styles.scroll}>
                <View style={styles.formControl}>
                  <Text style={styles.label}>Você é PCD?</Text>

                  <Switch
                    value={pcd.status}
                    onValueChange={pcd =>
                      this.props.setText(pcd, "CHANGED_PCD")
                    }
                  />
                </View>

                {pcd.status && (
                  <Input
                    style={styles.input}
                    placeholder="Digite seu numero de PCD"
                    placeholderTextColor="#2B2B2B"
                    onChangeText={numPcd =>
                      this.props.setText(numPcd, "CHANGED_NUM_PCD")
                    }
                    value={pcd.number}
                  />
                )}

                <View style={styles.formControl}>
                  <Text style={styles.label}>Você é Idoso?</Text>

                  <Switch
                    value={oldMan.status}
                    onValueChange={oldMan =>
                      this.props.setText(oldMan, "CHANGED_OLD_MAN")
                    }
                  />
                </View>

                {oldMan.status && (
                  <Input
                    style={styles.input}
                    placeholder="Digite seu numero de Idoso"
                    placeholderTextColor="#2B2B2B"
                    onChangeText={numOldMan =>
                      this.props.setText(numOldMan, "CHANGED_NUM_OLD_MAN")
                    }
                    value={oldMan.number}
                  />
                )}

                <Input
                  style={styles.input}
                  placeholder="Nome Completo"
                  placeholderTextColor="#2B2B2B"
                  onChangeText={name =>
                    this.props.setText(name, "CHANGED_NAME")
                  }
                  value={name}
                />

                <Input
                  style={styles.input}
                  placeholder="CPF"
                  maxLength={14}
                  placeholderTextColor="#2B2B2B"
                  keyboardType={"numeric"}
                  onChangeText={cpf => this.props.setCPF(cpf)}
                  value={cpf}
                />

                {cars.map((item, index) => (
                  <View key={index} style={styles.containerInput}>
                    <Input
                      style={styles.input}
                      placeholder="Placa do seu carro"
                      placeholderTextColor="#2B2B2B"
                      onChangeText={boardCar =>
                        this.props.addLicensePlate(cars, boardCar, index)
                      }
                      value={item.name}
                      maxLength={8}
                    />

                    <TouchableOpacity
                      onPress={() =>
                        this.props.deleteLicensePlate(cars, totalCars, index)
                      }
                      style={styles.deleteInput}
                    >
                      <FontAwesome style={styles.deleteIcon}>
                        {Icons.trashO}
                      </FontAwesome>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.addBoard}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.addInputLicensePlate(cars, totalCars)
                  }
                  disabled={disableAddCar}
                >
                  <Text style={styles.TextAddBoard}>ADICIONAR NOVA PLACA</Text>
                </TouchableOpacity>
              </View>
            </WhiteCard>

            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.props.saveUserAndCars(name, cars, pcd)}
              >
                <BtnPrimary text="PRÓXIMO" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    height: Dimensions.get("window").height,
    justifyContent: "center"
  },

  addBoard: {
    backgroundColor: "#FFE8C6",
    height: 48,
    borderRadius: 48,
    marginTop: 18
  },

  TextAddBoard: {
    color: "#FFA015",
    lineHeight: 48,
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Poppins-Medium"
  },

  buttons: {
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },

  titleCard: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 18,
    fontFamily: "Poppins-Bold"
  },

  input: {
    width: "100%",
    height: 42,
    borderColor: "#C9C9C9",
    borderWidth: 1,
    paddingHorizontal: 20,
    fontSize: 13,
    color: "#2B2B2B",
    marginTop: 19,
    fontFamily: "Poppins-Medium"
  },

  scroll: {
    //height: 280
    maxHeight: 320
  },

  containerInput: {
    position: "relative"
  },

  deleteInput: {
    position: "absolute",
    right: 10,
    top: 22
  },

  deleteIcon: {
    fontSize: 20,
    zIndex: 3,
    color: "#C9C9C9"
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
      addLicensePlate,
      deleteLicensePlate,
      addInputLicensePlate,
      setText,
      saveUserAndCars,
      getFontSize,
      setCPF
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterStepTwo);
