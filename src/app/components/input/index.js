import React, { Component } from "react";
import { BoxShadow } from "react-native-shadow";
import { View, StyleSheet, TextInput } from "react-native";

const shadowOpt = {};

const shadowOptColor = {
  width: 260,
  height: 60,
  color: "#000",
  border: 0,
  radius: 5
};
export default class Input extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  state = {
    isFocus: false
  };
  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        <BoxShadow
          setting={
            this.state.isFocus
              ? {
                  width: this.props.widthInput || 260,
                  height: 60,
                  color: "#09f",
                  border: 5,
                  radius: 3,
                  opacity: 0.2,
                  x: 0,
                  y: 1.5,
                  style: { marginVertical: 0, width: "100%" }
                }
              : {
                  width: this.props.widthInput || 260,
                  height: 60,
                  color: "#000",
                  border: 0,
                  radius: 5
                }
          }
        >
          <View
            style={[
              styles.content,
              { borderColor: this.state.isFocus ? "#09f" : "#C9C9C9" }
            ]}
          >
            <TextInput
              {...this.props}
              // autoCapitalize={this.props.autoCapitalize}
              // placeholderTextColor={this.props.placeholderTextColor}
              // placeholder={this.props.placeholder}
              // value={this.props.value}
              style={[styles.input, { width: this.props.widthInput || 260 }]}
              onFocus={() => this.setState({ isFocus: !this.state.isFocus })}
              onBlur={() => this.setState({ isFocus: !this.state.isFocus })}
              // onChangeText={() => this.props.onChangeText}
              underlineColorAndroid="transparent"
              // secureTextEntry={this.props.secureTextEntry}
              // keyboardType={this.props.keyboardType}
              // maxLength={this.props.maxLength}
              // minLength={this.props.minLength}
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
    borderWidth: 0,
    color: "#2B2B2B"
  }
});
