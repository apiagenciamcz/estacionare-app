import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class BtnPrimary extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.ViewBrown} >
                <Text style={styles.TextBrown}>{ this.props.text }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    ViewBrown: {
        backgroundColor: '#FFA015',
        width: 300,
        height: 62,
        borderRadius: 62,
    },

    TextBrown: {
        color:'#FFFFFF',
        lineHeight: 62,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },

});
