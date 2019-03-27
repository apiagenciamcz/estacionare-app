// React
import React from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import Toolbar from "../components/template/toolbar";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { OpenMapDirections } from "react-native-navigation-directions";
import FontAwesome, { Icons } from "react-native-fontawesome";

// Styles maps
import RetroMapStyles from "../../assets/mapsStyle.json";

// Actions
import {
  initLocalization,
  changeSearch,
  handleSearch,
  directions,
  clearLocation,
  setCoordsArea,
  onRegionChanger,
  onUserChanger,
  search,
  animatedSearch,
  setLocationSeach,
  currentLocation
} from "../actions/MapActions";
import Input from "../components/input";

class MapHome extends React.Component {
  static navigationOptions = {
    title: "Mapa",
    header: null,
    gesturesEnabled: false
  };

  componentDidMount() {
    this.props.initLocalization();
    console.log(this.props.map);
  }

  render() {
    const {
      location,
      currentUser,
      sensors,
      search,
      listLocations,
      iconSearch,
      flagSearch,
      widthAnim,
      searchDestiny
    } = this.props.map;
    console.log(this.props.map.location);
    const { count, limitTime } = this.props.home;
    var initialRegion = {
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />

        <View style={styles.containerSearch}>
          <View style={styles.boxSearch}>
            <TouchableOpacity
              style={styles.btnSearch}
              onPress={() => this.props.animatedSearch(widthAnim, flagSearch)}
            >
              <FontAwesome style={styles.iconSearch}>
                {Icons[iconSearch]}
              </FontAwesome>
            </TouchableOpacity>

            <View style={{ height: 60 }}>
              <Animated.View
                style={{
                  width: widthAnim,
                  height: 60
                }}
              >
                <Input
                  style={styles.input}
                  placeholder="Digite sua busca"
                  placeholderTextColor="#2B2B2B"
                  onChangeText={search => this.props.search(search)}
                  value={search}
                />
              </Animated.View>
            </View>
          </View>

          <View style={styles.listSeach}>
            {listLocations.length > 0 &&
              listLocations.slice(0, 3).map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.itemListSearch}
                  onPress={() =>
                    this.props.setLocationSeach(item.place_id, item.description)
                  }
                >
                  <Text>{item.description.substr(0, 50)}...</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.initLocale}
          onPress={() => this.props.currentLocation()}
        >
          <Image
            style={{ width: 22, height: 22 }}
            source={require("../images/location.png")}
          />
        </TouchableOpacity>

        <MapView
          region={initialRegion}
          // region={location}
          provider={PROVIDER_GOOGLE}
          customMapStyle={RetroMapStyles}
          style={styles.mapContainer}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          followsUserLocation={true}
        >
          {searchDestiny && (
            <MapViewDirections
              origin={currentUser}
              destination={searchDestiny.destination}
              resetOnChange={false}
              apikey={"AIzaSyDqK_G4WO7USQbA5n0mhvK-yR7DeUBO17w"}
            />
          )}

          {sensors &&
            sensors.map((item, index) => (
              <MapView.Marker
                key={index}
                image={
                  item.available == 1
                    ? require("../images/markerActive.png")
                    : require("../images/markerInactive.png")
                }
                coordinate={{
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lon)
                }}
              />
            ))}
        </MapView>

        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Toolbar
            navigation={this.props.navigation}
            disableTime={limitTime > 0.25 ? false : true}
            time={count != "--:--:--" ? true : false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end"
  },

  mapContainer: {
    flex: 1
  },

  boxHeader: {
    position: "absolute",
    top: 30,
    width: "100%"
  },

  headerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  blackBox: {
    borderTopRightRadius: 4,
    backgroundColor: "#2B2B2B",
    flex: 2,
    height: 32,
    paddingHorizontal: 14,
    alignItems: "flex-start",
    justifyContent: "center"
  },

  labelCash: {
    color: "#6E6E6E",
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    lineHeight: 18
  },

  titleCash: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Semibold",
    fontSize: 12
  },

  grayBox: {
    borderTopRightRadius: 4,
    flex: 1,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0"
  },

  addCash: {
    fontSize: 12,
    color: "#2B2B2B",
    fontFamily: "Poppins-Semibold"
  },

  buttons: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 64,
    width: "100%"
  },

  boxWhite: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  rowTimer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 95
  },

  timer: {
    fontSize: 44,
    fontFamily: "Poppins-Bold",
    lineHeight: 95,
    color: "#0FA3FF"
  },

  iconClock: {
    marginRight: 25,
    fontSize: 44,
    lineHeight: 95,
    color: "#0FA3FF"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    height: 69,
    paddingLeft: 17,
    paddingRight: 17,
    borderWidth: 1,
    borderTopColor: "#F0F0F0",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },

  index: {
    paddingLeft: 17,
    lineHeight: 69,
    color: "#6E6E6E",
    fontSize: 13,
    fontFamily: "Poppins-Medium"
  },

  text: {
    paddingRight: 17,
    lineHeight: 69,
    color: "#2B2B2B",
    fontSize: 16,
    fontFamily: "Poppins-Medium"
  },

  base: {
    backgroundColor: "rgba(0, 0, 0, .5)",
    height: "100%",
    width: "100%"
  },

  flexing: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    right: 0,
    padding: 20,
    position: "absolute"
  },

  boxInput: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#BDBDBD",
    borderWidth: 1
  },

  iconSearch: {
    marginRight: 12,
    marginLeft: 19,
    color: "#2B2B2B",
    fontSize: 16
  },

  input: {
    height: 60,
    color: "#2B2B2B",
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
    marginLeft: 10
  },

  markerTitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Semibold"
  },

  markerBox: {
    backgroundColor: "#9CE2A7",
    padding: 4,
    borderRadius: 4
  },

  initLocale: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    zIndex: 100
  },

  containerSearch: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 100,
    borderRadius: 100
  },

  boxSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderRadius: 100
  },

  listSeach: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderRadius: 10,
    maxWidth: "80%"
  },

  itemListSearch: {
    flexDirection: "row",
    padding: 10
  },

  btnSearch: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center"
  },

  btnNavigation: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 120,
    left: 20,
    zIndex: 100,
    borderRadius: 100,
    backgroundColor: "white"
  },

  iconNavigation: {
    fontSize: 22,
    color: "#2B2B2B"
  },

  iconSearch: {
    color: "#2B2B2B",
    fontSize: 18
  }
});

const mapStateToProps = state => ({
  receipt: state.receipt,
  home: state.home,
  menu: state.menu,
  map: state.map
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initLocalization,
      changeSearch,
      handleSearch,
      directions,
      clearLocation,
      setCoordsArea,
      onRegionChanger,
      onUserChanger,
      animatedSearch,
      setLocationSeach,
      currentLocation,
      search
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapHome);
