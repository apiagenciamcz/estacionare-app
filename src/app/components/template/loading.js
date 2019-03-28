// React
import React, { Component } from "react";
import { StyleSheet, Modal, Image, View } from "react-native";

export default class Loading extends Component {
  render() {
    return (
      <Modal
        onRequestClose={() => null}
        animationType={"none"}
        visible={this.props.loading}
        transparent={true}
      >
        <View style={styles.container}>
          <Image
            style={styles.container}
            resizeMode="stretch"
            source={require("../../images/loader.gif")}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#09f",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
});
