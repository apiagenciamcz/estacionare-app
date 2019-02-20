import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import FontAwesome, { Icons } from 'react-native-fontawesome'

export default class IconLeft extends React.Component {

    constructor(props) {
		super(props)
    }
    
    render(){
        const { navigation, nav, type } = this.props

        return (
            <TouchableOpacity onPress={() => navigation.goBack() } >
                <FontAwesome style={[ styles.iconMenu, { color: type == 'dark' ? '#414141' : 'white' }] }>
                    {Icons.chevronLeft}
                </FontAwesome>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    iconMenu: {
        fontSize: 20,
        marginLeft: 20,
    },

});
