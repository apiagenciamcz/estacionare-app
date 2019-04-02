// React
import React from "react";
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
  Picker,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import WhiteCard from "../../components/cards/cardWhite";
import TitleCard from "../../components/cards/cardTitle";
import IconLeft from "../../components/buttons/iconLeft";
import FontAwesome, { Icons } from "react-native-fontawesome";

// Actions
import {
  getStates,
  setCityLocation,
  setStateLocation,
  modalVisibleState,
  modalVisibleCity,
  getLocations
} from "../../actions/LocationAction";
import { getFontSize } from "../../actions/UserActions";

class PayStepOne extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <IconLeft navigation={navigation} type="light" />
  });

  componentDidMount = () => {
    this.props.getLocations();
    this.props.getFontSize();
  };

  render() {
    const {
      allStates,
      allCitys,
      city,
      state,
      modalCity,
      visibleState,
      visibleCity
    } = this.props.location;
    const { fontSize } = this.props.user;
    console.log("LOCATIONS", this.props.location);
    return (
      <ImageBackground
        source={require("../../images/background.png")}
        style={styles.container}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <WhiteCard>
          <TitleCard text="Qual sua cidade?" offset="1" limit="4" />

          <TouchableOpacity
            onPress={() => this.props.getStates()}
            style={[styles.placeholder, { marginTop: 30 }]}
          >
            <Text>
              {state.hasOwnProperty("id")
                ? state.id
                : state !== ""
                ? state
                : "Selecione seu estado"}
            </Text>
            <FontAwesome style={styles.icon}>{Icons.chevronDown}</FontAwesome>
          </TouchableOpacity>

          <Modal
            onRequestClose={() => null}
            animationType="slide"
            transparent={true}
            visible={visibleState == "visible" ? true : false}
          >
            <View style={styles.modalContainer}>
              <View style={styles.buttonContainer}>
                <Text
                  style={{ color: "gray" }}
                  onPress={() => this.props.modalVisibleState("hidden")}
                >
                  Fechar
                </Text>
              </View>
              <View style={styles.picker}>
                <TouchableWithoutFeedback
                  onPress={() => this.props.modalVisibleState("hidden")}
                >
                  <Picker
                    selectedValue={
                      state.hasOwnProperty("id")
                        ? state.id
                        : state !== ""
                        ? state
                        : "Selecione seu estado"
                    }
                    onValueChange={itemValue =>
                      this.props.setStateLocation(itemValue)
                    }
                  >
                    {allStates &&
                      allStates.map((i, index) => (
                        <Picker.Item key={index} label={i.id} value={i.id} />
                      ))}
                  </Picker>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => this.props.modalVisibleCity("visible")}
            style={styles.placeholder}
            disabled={modalCity}
          >
            <Text>
              {allCitys.length > 1
                ? "Selecione sua cidade"
                : city != ""
                ? city
                : "Selecione sua cidade"}
            </Text>
            <FontAwesome style={styles.icon}>{Icons.chevronDown}</FontAwesome>
          </TouchableOpacity>

          <Modal
            onRequestClose={() => null}
            animationType="slide"
            transparent={true}
            visible={visibleCity == "visible" ? true : false}
          >
            <View style={styles.modalContainer}>
              <View style={styles.buttonContainer}>
                <Text
                  style={{ color: "gray" }}
                  onPress={() => this.props.modalVisibleCity("hidden")}
                >
                  Fechar
                </Text>
              </View>
              <View style={styles.picker}>
                <TouchableWithoutFeedback
                  onPress={() => this.props.modalVisibleCity("hidden")}
                >
                  <Picker
                    selectedValue={city}
                    onValueChange={itemValue =>
                      this.props.setCityLocation(itemValue)
                    }
                  >
                    {allCitys &&
                      allCitys.map((i, index) => (
                        <Picker.Item
                          key={index}
                          label={i.cidade}
                          value={i.cidade}
                        />
                      ))}
                  </Picker>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </Modal>
        </WhiteCard>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },

  selects: {
    width: "100%",
    borderColor: "#C9C9C9",
    borderWidth: 1,
    fontSize: 16,
    color: "#2B2B2B",
    marginTop: 19,
    fontFamily: "Poppins-Medium"
  },

  options: {
    width: 200,
    left: 0,
    borderWidth: 0,
    padding: 20,
    fontSize: 13,
    color: "#2B2B2B",
    fontFamily: "Poppins-Medium"
  },

  placeholder: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderColor: "#C9C9C9",
    borderWidth: 1,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
  location: state.location,
  user: state.user
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getStates,
      setCityLocation,
      setStateLocation,
      modalVisibleState,
      modalVisibleCity,
      getFontSize,
      getLocations
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayStepOne);
