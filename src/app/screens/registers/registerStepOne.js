// React
import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import WhiteCard from "../../components/cards/cardWhite";
import TitleCard from "../../components/cards/cardTitle";
import GmailButton from "../../components/buttons/gmail";
import FacebookButton from "../../components/buttons/facebook";
import BtnPrimary from "../../components/buttons/btnPrimary";
import IconLeft from "../../components/buttons/iconLeft";
import Loading from "../../components/template/loading";

// Actions
import {
  handlerCreateFacebook,
  handlerCreateGoogle,
  handleCreateLogin,
  setText,
  loginGoogleConfigure
} from "../../actions/RegisterActions";
import { getFontSize } from "../../actions/UserActions";
import Input from "../../components/input";

class RegisterStepOne extends React.Component {
  componentDidMount() {
    this.props.getFontSize();
    this.props.loginGoogleConfigure();
  }

  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <IconLeft navigation={navigation} type="light" />
  });

  render() {
    const { email, password, confirmePassword, loading } = this.props.register;

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
              <TitleCard text="CRIE SUA CONTA" offset="1" limit="3" />

              <Input
                autoCapitalize="none"
                style={styles.input}
                placeholder="E-mail"
                keyboardType="email-address"
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

              <Input
                secureTextEntry
                autoCapitalize="none"
                style={styles.input}
                placeholder="Confirmar senha"
                placeholderTextColor="#2B2B2B"
                onChangeText={confirmePassword =>
                  this.props.setText(
                    confirmePassword,
                    "CHANGED_CONFIRME_PASSWORD"
                  )
                }
                value={confirmePassword}
              />

              <TouchableOpacity
                onPress={() => this.props.handlerCreateFacebook()}
              >
                <FacebookButton />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.handlerCreateGoogle()}
              >
                <GmailButton />
              </TouchableOpacity>
            </WhiteCard>

            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() =>
                  this.props.handleCreateLogin(
                    email,
                    password,
                    confirmePassword
                  )
                }
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

  buttons: {
    alignItems: "center",
    justifyContent: "center",
    height: 124
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
  register: state.register,
  user: state.user
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handlerCreateFacebook,
      handlerCreateGoogle,
      handleCreateLogin,
      setText,
      getFontSize,
      loginGoogleConfigure
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterStepOne);
