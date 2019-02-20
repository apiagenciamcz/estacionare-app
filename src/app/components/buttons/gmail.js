import React from 'react'
import { 
    View,
    Text,
    StyleSheet
} from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'

export default class GmailButton extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.gmail} >
                <FontAwesome style={styles.iconGmail}>{Icons.google}</FontAwesome>
                <Text style={styles.TextGmail}>CONECTAR COM GOOGLE</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    gmail:{
        backgroundColor: '#FFFFFF',
        marginTop: 13,
        borderRadius: 6,
        height: 36,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },

    TextGmail:{
        color:'#EA4335',
        fontSize: 13,
        fontFamily: 'Poppins-Bold',
        marginLeft: 13,
    },

    iconGmail: {    
        color:'#EA4335',
        fontSize: 18
    }

});