import React from 'react'
import { 
    View,
    TouchableOpacity,
    Text,    
    StyleSheet
} from 'react-native'

import FontAwesome, { Icons } from 'react-native-fontawesome'


export default class FacebookButton extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.facebook} >
                <FontAwesome style={styles.iconFacebook}>{Icons.facebookOfficial}</FontAwesome>
                <Text style={styles.TextFacebook}>CONECTAR COM FACEBOOK</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    facebook:{
        backgroundColor: '#3E5798',
        marginTop: 13,
        borderRadius: 6,
        height: 36,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },

    TextFacebook:{
        color:'white',
        fontSize: 13,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        fontFamily: 'Poppins-Bold',
        marginLeft: 13,
    },   

    iconFacebook: {    
        color:'white',
        fontSize: 18
    }

});