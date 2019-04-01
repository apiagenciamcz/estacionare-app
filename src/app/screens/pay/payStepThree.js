import React from "react";
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import WhiteCard from "../../components/cards/cardWhite";
import TitleCard from "../../components/cards/cardTitle";
import IconLeft from "../../components/buttons/iconLeft";

import { setArea, getAreas } from "../../actions/AreaActions";
import { getFontSize } from "../../actions/UserActions";

class PayStepThree extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <IconLeft navigation={navigation} type="light" />
  });

  componentDidMount() {
    const { city, state } = this.props.location;
    this.props.getAreas(state, city);
    this.props.getFontSize();
  }

  render() {
    const { partners } = this.props.area;
    const { fontSize } = this.props.user;
    console.log("PARTNES", partners);
    return (
      <ImageBackground
        source={require("../../images/background.png")}
        style={styles.container}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <WhiteCard>
          <TitleCard text="Selecione o setor" offset="3" limit="4" />
          {Object.keys(partners).map(keyPartner =>
            Object.values(partners[keyPartner].areas).map((area, key) => (
              <TouchableOpacity
                key={key}
                style={[styles.button, { backgroundColor: area.color }]}
                onPress={() =>
                  this.props.setArea(area.name, area.value, keyPartner)
                }
              >
                <View>
                  <Text style={[styles.label, { fontSize: 16 * fontSize }]}>
                    {area.name}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.min, { fontSize: 8 * fontSize }]}>
                    Valor mínimo
                  </Text>
                  <Text style={[styles.val, { fontSize: 14 * fontSize }]}>
                    R$ {area.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
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

  button: {
    height: 68,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35
  },

  label: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },

  min: {
    color: "white",
    fontSize: 8,
    fontFamily: "Poppins-Medium"
  },

  val: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Poppins-Medium"
  }
});

const mapStateToProps = state => ({
  area: state.area,
  user: state.user,
  location: state.location
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setArea, getFontSize, getAreas }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayStepThree);
