import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import FontAwesome, { Icons } from 'react-native-fontawesome'

export default class Pay extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.btn}>
                <FontAwesome style={styles.icon}>{Icons.creditCardAlt}</FontAwesome>
                <Text style={styles.text}>PAGAR PARQUÍMETRO</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    btn:{
        backgroundColor: '#FFA015',
        borderRadius: 83,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 53,
        flexDirection: 'row'
    },

    text:{
        color:'white',
        fontSize: 16,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        fontFamily: 'Poppins-Bold',
        marginLeft: 12
    },   

    icon: {
        fontSize: 20,
        color: '#FFE8C6',
    }

});