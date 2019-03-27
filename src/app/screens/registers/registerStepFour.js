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
  Switch
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import BtnPrimary from "../../components/buttons/btnPrimary";
import IconLeft from "../../components/buttons/iconLeft";
import Swiper from "react-native-swiper";
import FontAwesome, { Icons } from "react-native-fontawesome";

// Actions
import {
  changeTypeAccount,
  saveTypeAccount
} from "../../actions/RegisterActions";

class RegisterStepFour extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <IconLeft navigation={navigation} type="light" />
  });

  render() {
    let { typeAccount } = this.props.register;

    let dotsActive = (
      <View
        style={{
          backgroundColor: "rgba(255,255,255,1)",
          width: 12,
          height: 12,
          borderRadius: 13,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
          borderColor: "#FFFFFF",
          borderWidth: 1
        }}
      />
    );

    let dots = (
      <View
        style={{
          backgroundColor: "transparent",
          width: 12,
          height: 12,
          borderRadius: 13,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
          borderColor: "#FFFFFF",
          borderWidth: 1
        }}
      />
    );

    return (
      <ImageBackground
        source={require("../../images/background.png")}
        style={styles.container}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <Swiper
          style={styles.wrapper}
          loop={false}
          showsButtons={false}
          activeDot={dotsActive}
          dots={dots}
        >
          <View style={styles.slide} index={2}>
            <TouchableOpacity
              style={[styles.bg, typeAccount == "Free" && styles.active]}
              onPress={() => this.props.changeTypeAccount("Free")}
            >
              <View style={styles.titleAlign}>
                {typeAccount == "Free" && (
                  <View style={styles.baseIconActive} />
                )}
                {typeAccount == "Free" && (
                  <FontAwesome style={styles.iconActive}>
                    {Icons.check}
                  </FontAwesome>
                )}
                <Text style={styles.title}>PLANO FREE</Text>
              </View>

              <View style={styles.list}>
                <View style={[styles.gray, styles.item]}>
                  <FontAwesome style={[styles.icon, styles.green]}>
                    {Icons.check}
                  </FontAwesome>
                  <Text style={styles.text}>Pagamento de paraquímetro</Text>
                </View>
                <View style={[styles.white, styles.item]}>
                  <FontAwesome style={[styles.icon, styles.red]}>
                    {Icons.times}
                  </FontAwesome>
                  <Text style={styles.text}>Vizualização de vagas</Text>
                </View>
                <View style={[styles.gray, styles.item]}>
                  <FontAwesome style={[styles.icon, styles.red]}>
                    {Icons.times}
                  </FontAwesome>
                  <Text style={styles.text}>GPS</Text>
                </View>
                <View style={[styles.white, styles.item]}>
                  <FontAwesome style={[styles.icon, styles.red]}>
                    {Icons.times}
                  </FontAwesome>
                  <Text style={styles.text}>Promoções exclusivas</Text>
                </View>
              </View>

              <View style={styles.basePurple}>
                <Text style={styles.textWhite}>FREE</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.slide} index={1}>
            <TouchableOpacity
              style={[styles.bg, typeAccount == "Premium" && styles.active]}
              onPress={() => this.props.changeTypeAccount("Premium")}
            >
              <View style={styles.titleAlign}>
                {typeAccount == "Premium" && (
                  <View style={styles.baseIconActive} />
                )}
                {typeAccount == "Premium" && (
                  <FontAwesome style={styles.iconActive}>
                    {Icons.check}
                  </FontAwesome>
                )}
                <Text style={styles.title}>MENSAL</Text>
              </View>

              <View style={styles.list}>
                <View style={[styles.gray, styles.item]}>
                  <FontAwesome style={[styles.icon, styles.green]}>
                    {Icons.check}
                  </FontAwesome>
                  <Text style={styles.text}>Pagamento de paraquímetro</Text>
                </View>
                <View style={[styles.white, styles.item]}>
                  <FontAwesome style={[styles.icon, styles.green]}>
                    {Icons.check}
                  </FontAwesome>
                  <Text style={styles.text}>Vizualização de vagas</Text>
                </View>
                <View style={[styles.gray, styles.item]}>
                  <FontAwesome style={[styles.icon, styles.green]}>
                    {Icons.check}
                  </FontAwesome>
                  <Text style={styles.text}>GPS</Text>
                </View>
                <View style={[styles.white, styles.item]}>
                  <FontAwesome style={[styles.icon, styles.green]}>
                    {Icons.check}
                  </FontAwesome>
                  <Text style={styles.text}>Promoções exclusivas</Text>
                </View>
              </View>

              <View style={styles.basePurple}>
                <Text style={styles.textWhite}>R$ 30,00/mês</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Swiper>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => this.props.saveTypeAccount(typeAccount)}
          >
            <BtnPrimary text="PRÓXIMO" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  titleAlign: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16
  },

  title: {
    fontSize: 18,
    color: "#2B2B2B",
    fontFamily: "Poppins-Medium"
  },

  item: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 18
  },

  icon: {
    fontSize: 26,
    paddingRight: 18
  },

  gray: {
    backgroundColor: "#F2F2F2"
  },

  white: {
    backgroundColor: "#FFFFFF"
  },

  red: {
    color: "#C12020"
  },

  green: {
    color: "#0EAC75"
  },

  basePurple: {
    backgroundColor: "#125894",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },

  textWhite: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "Poppins-Medium"
  },

  text: {
    fontFamily: "Poppins-Medium",
    color: "#414141",
    fontSize: 14
  },

  bg: {
    height: "80%",
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "space-between"
  },

  active: {
    borderColor: "#0EA9AC",
    borderWidth: 5
  },

  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  buttons: {
    alignItems: "center",
    justifyContent: "center"
  },

  pagination: {
    width: 13,
    height: 13
  },

  baseIconActive: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#0EA9AC",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    right: -26,
    top: -6
  },

  iconActive: {
    color: "white",
    fontSize: 16,
    position: "absolute",
    top: 10,
    right: 10
  }
});

const mapStateToProps = state => ({
  register: state.register,
  user: state.user
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeTypeAccount, saveTypeAccount }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterStepFour);
