import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  WebView,
  Dimensions
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HTMLView from "react-native-htmlview";

import { getFontSize } from "../../actions/UserActions";

class ContentTermsUse extends Component {
  componentDidMount() {
    this.props.getFontSize();
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#000",
          width: Dimensions.get("window").width + 80,
          height: Dimensions.get("window").height - 110,
          marginLeft: -8,
          marginTop: -20
        }}
      >
        <WebView
          style={{
            height: Dimensions.get("window").height,
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#2B2B2B",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-Bold"
  },

  text: {
    fontSize: 12,
    color: "#6E6E6E",
    fontFamily: "Poppins-Regular",
    lineHeight: 18
  }
});

const mapStateToProps = state => ({
  user: state.user
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFontSize }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentTermsUse);
