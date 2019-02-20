import React from 'react';
import { 
    StyleSheet,
    ImageBackground,
    Image,
    StatusBar,
    TouchableOpacity
} from 'react-native';

export default class Confirm extends React.Component {

  static navigationOptions = {
    title: 'Confirm',
    header: null
  };

  render() {
    const { navigate } = this.props.navigation
  
    setTimeout(() => {
        navigate('Tutorial')
    },3000)
    
    return (
        <ImageBackground source={require("../images/background.png")} style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />

            <TouchableOpacity onPress={() => navigate('Tutorial')} >
                <Image source={require("../images/success.png")}/>
            </TouchableOpacity>

        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },


});
