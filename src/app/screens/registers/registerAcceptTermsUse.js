// React
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import ContentTermsUse from "../../components/template/contentTermsUse";
import Header from "../../components/template/header";

// Actions
import { saveTermsOfUse } from "../../actions/RegisterActions";

class RegisterAcceptTermsUse extends React.Component {
  static navigationOptions = () => ({
    header: null
  });

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <Header navigation={this.props.navigation} title="TERMOS DE USO" />

        <ContentTermsUse />

      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },

  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24
  },

  text: {
    paddingLeft: 24,
    paddingRight: 24
  },

  red: {
    backgroundColor: "#BE0000",
    height: 55,
    flex: 1,
    borderRadius: 55,
    marginLeft: 5,
    marginRight: 5
  },

  green: {
    backgroundColor: "#429B0A",
    height: 55,
    flex: 1,
    borderRadius: 55,
    marginLeft: 5,
    marginRight: 5
  },

  textButton: {
    lineHeight: 55,
    textAlign: "center",
    color: "white"
  }
});

const mapStateToProps = state => ({
  register: state.register
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveTermsOfUse }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterAcceptTermsUse);
