// React
import React from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Picker,
  Dimensions
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import BtnPrimary from "../components/buttons/btnPrimary";
import Header from "../components/template/header";
import IconLeft from "../components/buttons/iconLeft";
import FontAwesome, { Icons } from "react-native-fontawesome";

// Actions
import {
  modalVisibleCity,
  init,
  setCityLocation,
  saveCar,
  setText,
  saveTaxRegulations,
  readQRCode,
  setNumberQRCode
} from "../actions/TaxRegulationActions";
import { getFontSize } from "../actions/UserActions";

import QRCodeScanner from "react-native-qrcode-scanner";
import Input from "../components/input";

class TaxRegulation extends React.Component {
  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.init();
    this.props.getFontSize();
  };

  render = () => {
    const {
      licencePlates,
      city,
      visibleCity,
      allCitys,
      alertNumber,
      car,
      modalQRcode
    } = this.props.taxRegulation;
    const { fontSize } = this.props.user;
    const width =
      Dimensions.get("window").width - Dimensions.get("window").width * 0.12;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <Header navigation={this.props.navigation} title="REGULARIZAÇÃO" />

        <View style={styles.subContainer}>
          <TouchableOpacity
            onPress={() => this.props.modalVisibleCity("visible")}
            style={styles.placeholder}
          >
            <Text style={[styles.text, { fontSize: 13 * fontSize }]}>
              {city != "" ? city : "Selecione sua cidade"}
            </Text>
            <FontAwesome style={styles.icon}>{Icons.chevronDown}</FontAwesome>
          </TouchableOpacity>

          <View style={{ position: "relative" }}>
            <Input
              widthInput={width}
              style={[styles.text, { fontSize: 13 * fontSize }]}
              placeholder="Número de aviso"
              placeholderTextColor="#2B2B2B"
              value={alertNumber}
              onChangeText={number =>
                this.props.setText(number, "CHANGED_NUMBER")
              }
            />
            <TouchableOpacity
              onPress={() => this.props.readQRCode(true)}
              style={{ position: "absolute", right: 10, top: 22 }}
            >
              <FontAwesome style={[styles.icon]}>{Icons.qrcode}</FontAwesome>
            </TouchableOpacity>
          </View>

          <Modal
            onRequestClose={() => null}
            animationType="slide"
            transparent={true}
            visible={modalQRcode}
          >
            <View style={styles.scannerQRCode}>
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity
                  style={styles.arrow}
                  onPress={() => this.props.readQRCode(false)}
                >
                  <FontAwesome style={{ color: "white", fontSize: 36 }}>
                    {Icons.times}
                  </FontAwesome>
                </TouchableOpacity>
              </View>
              <QRCodeScanner onRead={e => this.props.setNumberQRCode(e.data)} />
            </View>
          </Modal>

          <Text style={[styles.title, { fontSize: 18 * fontSize }]}>
            SELECIONE A PLACA
          </Text>

          {licencePlates &&
            Object.values(licencePlates).map((item, index) => (
              <TouchableOpacity
                style={styles.placeholderPlate}
                key={index}
                onPress={() => this.props.saveCar(item.name)}
              >
                <Text
                  style={[
                    styles.text,
                    { textAlign: "center", fontSize: 13 * fontSize }
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}

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
                    {allCitys.map((i, index) => (
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
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() =>
              this.props.saveTaxRegulations(alertNumber, city, car)
            }
          >
            <BtnPrimary text="CONSULTAR REGULARIZAÇÃO" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around"
  },

  subContainer: {
    padding: 24
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
    height: 60,
    borderColor: "#C9C9C9",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },

  placeholderPlate: {
    paddingHorizontal: 30,
    lineHeight: 54,
    height: 60,
    borderColor: "#C9C9C9",
    borderWidth: 1,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "center",
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
  },

  icon: {
    fontSize: 20
  },

  text: {
    color: "#2B2B2B",
    fontSize: 13,
    flex: 1
  },

  title: {
    color: "#2B2B2B",
    marginTop: 30,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Semibold"
  },

  buttons: {
    height: 80,
    justifyContent: "center",
    alignItems: "center"
  },

  scannerQRCode: {
    flex: 1,
    backgroundColor: "black"
  },

  arrow: {
    margin: 20,
    alignSelf: "center"
  }
});

const mapStateToProps = state => ({
  taxRegulation: state.taxRegulation,
  user: state.user
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      modalVisibleCity,
      init,
      setCityLocation,
      saveCar,
      setText,
      saveTaxRegulations,
      getFontSize,
      readQRCode,
      setNumberQRCode
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxRegulation);
