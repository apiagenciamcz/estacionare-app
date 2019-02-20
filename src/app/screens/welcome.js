import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';

import BtnPrimary from '../components/buttons/btnPrimary'

export default class Welcome extends React.Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        title: 'Início',
        header: null
    }

    render() {
        const { navigate } = this.props.navigation

        return (
            <ImageBackground source={require("../images/background.png")} style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <Image source={require("../images/logo-white.png")} style={styles.logo}></Image>
                <View style={styles.buttons}>
                    <View style={styles.ViewBrown} >
                        <TouchableOpacity onPress={() => navigate('RegisterStepOne', { name: 'RegisterStepOne' })} >
                            <BtnPrimary text='CRIAR CONTA'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ViewWhite} >
                        <TouchableOpacity onPress={() => navigate('Login', { name: 'login' })} >
                            <Text style={styles.TextWhite}>FAZER LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height:'100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    ViewBrown: {
        backgroundColor: '#3A1A00',
        marginBottom: 13,
        width: 300,
        height: 62,
        borderRadius: 62,
    },

    TextBrown: {
        color:'#F49810',
        lineHeight: 62,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },

    ViewWhite: {
        backgroundColor: 'transparent',
        borderColor: '#ffffff',
        marginBottom: 13,
        width: 300,
        height: 62,
        borderWidth: 2,
        borderRadius: 62,
    },

    TextWhite: {
        color:'#ffffff',
        lineHeight: 62,
        textAlign: 'center',
        lineHeight: 62,
        fontFamily: 'Poppins-Medium',
    },

    buttons: {
        position:'absolute',
        bottom: 40
    },

    logo: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain', 
    },

});

