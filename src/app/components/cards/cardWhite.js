import React from 'react'
import { 
    View,
    StyleSheet
} from 'react-native';

export default class WhiteCard extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.containerCard}>

                <View style={styles.cards}>

                    { this.props.children }

                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({

    containerCard:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    cards:{
        width: 300,
        borderRadius: 12,
        backgroundColor: 'white',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

});
