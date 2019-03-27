import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "../../components/template/header";

import { getlistReceipts, getFontSize } from "../../actions/UserActions";

class ListReceipts extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "COMPROVANTES"
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getlistReceipts();
    this.props.getFontSize();
  }

  formatItem(item) {
    let dataInit = new Date(item.time.init);
    let dataLimit = new Date(item.time.limit);
    let formaDate = `${dataInit.getDate()}/${dataInit.getMonth() +
      1}/${dataInit.getFullYear()}`;

    let init = `${dataInit.getHours()}:${dataInit.getMinutes()}`;
    let limit = `${dataLimit.getHours()}:${dataLimit.getMinutes()}`;

    return `${formaDate} -  ${init} às ${limit} \n ${item.area.name}`;
  }

  formatItemCredit(item, text) {
    let dataInit = new Date(item.date);
    let formaDate = `${dataInit.getDate()}/${dataInit.getMonth() +
      1}/${dataInit.getFullYear()}`;

    let init = `${dataInit.getHours()}:${dataInit.getMinutes()}`;

    return `${formaDate} -  ${init} \n ${text}`;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { time, credit, taxRegulation } = this.props.user.receipts;
    const { fontSize } = this.props.user;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Header navigation={this.props.navigation} title="COMPROVANTES" />

        <ScrollView>
          <Text style={[styles.title, { fontSize: 18 * fontSize }]}>
            Parquímetros
          </Text>

          {time &&
            Object.values(time).map((receipt, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigate("ItemReceipts", { receipt: receipt.item })
                }
                key={index}
              >
                <View style={styles.formControl}>
                  <Text style={[styles.label, { fontSize: 14 * fontSize }]}>
                    {this.formatItem(receipt.item)}
                  </Text>
                  <Text style={[styles.val, { fontSize: 16 * fontSize }]}>
                    {receipt.item.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

          <Text style={[styles.title, { fontSize: 18 * fontSize }]}>
            Créditos
          </Text>

          {credit &&
            Object.values(credit).map((receipt, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigate("ItemReceipts", { receipt: receipt.item })
                }
                key={index}
              >
                <View style={styles.formControl}>
                  <Text style={[styles.label, { fontSize: 14 * fontSize }]}>
                    {this.formatItemCredit(receipt.item, "Recarga")}
                  </Text>
                  <Text
                    style={[styles.val, { fontSize: 16 * fontSize }]}
                  >{`R$ ${receipt.item.value},00`}</Text>
                </View>
              </TouchableOpacity>
            ))}

          <Text style={[styles.title, { fontSize: 18 * fontSize }]}>
            Taxa de regularização
          </Text>

          {taxRegulation &&
            Object.values(taxRegulation).map((receipt, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigate("ItemReceipts", { receipt: receipt.item })
                }
                key={index}
              >
                <View style={styles.formControl}>
                  <Text style={[styles.label, { fontSize: 14 * fontSize }]}>
                    {this.formatItemCredit(
                      receipt.item,
                      "Taxa de regularização"
                    )}
                  </Text>
                  <Text
                    style={[styles.val, { fontSize: 16 * fontSize }]}
                  >{`R$ ${receipt.item.value},00`}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  title: {
    color: "#2B2B2B",
    fontSize: 18,
    fontFamily: "Poppins-Semibold",
    margin: 20,
    marginTop: 30,
    textAlign: "center"
  },

  formControl: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    height: 70,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0"
  },

  label: {
    color: "#2B2B2B",
    fontSize: 14,
    fontFamily: "Poppins-Regular"
  },

  val: {
    color: "#2B2B2B",
    fontSize: 16,
    fontFamily: "Poppins-Regular"
  },

  border: {
    borderTopWidth: 1,
    borderColor: "#E0E0E0"
  },

  iconMenu: {
    fontSize: 25
  }
});

const mapStateToProps = state => ({
  user: state.user
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getlistReceipts, getFontSize }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListReceipts);
