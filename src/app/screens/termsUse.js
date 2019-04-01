import React from "react";
import { StyleSheet, View, StatusBar, Dimensions, WebView } from "react-native";

import ContentTermsUse from "../components/template/contentTermsUse";

import Header from "../components/template/header";

export default class TermsUse extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "TERMOS DE USO"
  });

  render() {
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <Header navigation={this.props.navigation} title="TERMOS DE USO" />
        <View style={styles.align}>
          <View
            style={{
              backgroundColor: "#000",
              width: Dimensions.get("window").width + 80,
              height: Dimensions.get("window").height,
              marginLeft: -32,
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

  align: {
    paddingHorizontal: 24
  }
});
