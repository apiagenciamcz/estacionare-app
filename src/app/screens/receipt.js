import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, StatusBar, View } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DetailsReceipt from '../components/template/detailsReceipt'
import BtnPrimary from '../components/buttons/btnPrimary'
import IconLeft from '../components/buttons/iconLeft'

import { saveAll } from '../actions/ReceiptAction'

class Receipt extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTransparent: true,
        headerLeft: <IconLeft navigation={navigation} type='light'/>
    })

    constructor(props){
        super(props)
    }
    
    render() {
        
        return (
            <ImageBackground source={require("../images/background.png")} style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <DetailsReceipt item={this.props.receipt}/>
                
                <View style={styles.buttons} >
                    <TouchableOpacity onPress={() => this.props.saveAll(this.props.receipt)}>
                        <BtnPrimary text='CONFIRMAR' />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    buttons: {
        height: 140,
        justifyContent: 'center',        
        alignItems: 'center',
    }

});

const mapStateToProps = state => ({
    receipt : state.receipt,
    home : state.home,
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ saveAll }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)