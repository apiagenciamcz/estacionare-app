import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  WebView,
  Dimensions
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HTMLView from "react-native-htmlview";

import { getFontSize } from "../../actions/UserActions";
import { saveTermsOfUse } from "../../actions/RegisterActions";

class ContentTermsUse extends Component {
  componentDidMount() {
    this.props.getFontSize();
  }

  render() {
    return (
      <View
        style={{
          width: Dimensions.get("window").width + 80,
          height: '100%',
          position:'absolute',
          marginLeft: -8,
          top:60,
          paddingBottom:50,
        }}
      >
        <WebView
          style={{
            height: Dimensions.get("window").height  ,
            width: Dimensions.get("window").width + 80
          }}
          source={{
            html: `
               <iframe src="https://estaciomobi.app/termos-de-uso" style=" border: none" height="${
                 Dimensions.get("window").height
               } px" width="${Dimensions.get("window").width}px"/>
            `
          }}
          automaticallyAdjustContentInsets={false}
        />
          <View style={styles.buttons}>
          <View style={styles.red}>
            <TouchableOpacity
              onPress={() =>
                navigate("RegisterStepOne", { name: "RegisterStepOne" })
              }
            >
              <Text style={styles.textButton}>NÃO ACEITO</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.green}>
            <TouchableOpacity onPress={() => this.props.saveTermsOfUse()}>
              <Text style={styles.textButton}>ACEITO</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    width:'87%',
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
  user: state.user,
  register: state.register

});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFontSize,saveTermsOfUse  }, dispatch);
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentTermsUse);
