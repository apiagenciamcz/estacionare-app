// React
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import WhiteCard from "../components/cards/cardWhite";
import GmailButton from "../components/buttons/gmail";
import FacebookButton from "../components/buttons/facebook";
import BtnPrimary from "../components/buttons/btnPrimary";
import IconLeft from "../components/buttons/iconLeft";
import Loading from "../components/template/loading";

// Actions
import {
  loginFacebook,
  loginGoogle,
  handleLogin,
  setText,
  loginGoogleConfigure
} from "../actions/LoginActions";
import Input from "../components/input";

class Login extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <IconLeft navigation={navigation} type="light" />
  });

  componentDidMount = () => {
    this.props.loginGoogleConfigure();
  };

  render() {
    const { loading, email, password } = this.props.login;

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

            <Loading loading={loading} />

            <WhiteCard>
              <Text style={styles.titleCard}>FAZER LOGIN</Text>
              <Input
                autoCapitalize="none"
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#2B2B2B"
                onChangeText={email =>
                  this.props.setText(email, "CHANGED_EMAIL")
                }
                value={email}
              />

              <Input
                secureTextEntry
                autoCapitalize="none"
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#2B2B2B"
                onChangeText={password =>
                  this.props.setText(password, "CHANGED_PASSWORD")
                }
                value={password}
              />

              <TouchableOpacity onPress={this.props.loginFacebook}>
                <FacebookButton />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.props.loginGoogle}>
                <GmailButton />
              </TouchableOpacity>
            </WhiteCard>

            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.props.handleLogin(email, password)}
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
    paddingHorizontal: 20,
    paddingTop: 60,
    height: Dimensions.get("window").height,
    justifyContent: "center"
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
    lineHeight: 62,
    textAlign: "center",
    fontFamily: "Poppins-Medium"
  },

  buttons: {
    height: 160,
    justifyContent: "center",
    alignItems: "center"
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
  }
});

const mapStateToProps = state => ({
  login: state.login
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loginFacebook, loginGoogle, handleLogin, setText, loginGoogleConfigure },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
