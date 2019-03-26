import React, { Component } from "react";
import { BoxShadow } from "react-native-shadow";
import { View, StyleSheet, TextInput } from "react-native";

const shadowOpt = {
  width: 260,
  height: 60,
  color: "#09f",
  border: 5,
  radius: 3,
  opacity: 0.2,
  x: 0,
  y: 1.5,
  style: { marginVertical: 0, width: "100%" }
};

const shadowOptColor = {
  width: 260,
  height: 60,
  color: "#000",
  border: 0,
  radius: 5
};
export default class Input extends Component {
  state = {
    isFocus: false
  };
  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        <BoxShadow setting={this.state.isFocus ? shadowOpt : shadowOptColor}>
          <View
            style={[
              styles.content,
              this.state.isFocus ? { borderColor: "#09f" } : null
            ]}
          >
            <TextInput
              autoCapitalize={this.props.autoCapitalize}
              placeholderTextColor={this.props.placeholderTextColor}
              placeholder={this.props.placeholder}
              value={this.props.value}
              style={styles.input}
              onFocus={() => this.setState({ isFocus: !this.state.isFocus })}
              onBlur={() => this.setState({ isFocus: !this.state.isFocus })}
              onChangeText={() => this.props.onChangeText()}
              underlineColorAndroid="transparent"
              secureTextEntry={this.props.secureTextEntry}
            />
          </View>
        </BoxShadow>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  input: {
    height: 40,
    borderWidth: 0
  }
});
