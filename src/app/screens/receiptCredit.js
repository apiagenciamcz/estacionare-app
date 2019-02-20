import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, StatusBar, View } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DetailsReceiptCredit from '../components/template/detailsReceiptCredit'
import BtnPrimary from '../components/buttons/btnPrimary'

import { generateReceipt } from '../actions/MoneyActions'

class ReceiptCredit extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <ImageBackground source={require("../images/background.png")} style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <DetailsReceiptCredit item={this.props.money.receipt}/>
                
                <View style={styles.buttons} >
                    <TouchableOpacity onPress={() => this.props.generateReceipt(this.props.money.total, this.props.money.receipt)}>
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
    money : state.money,
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ generateReceipt }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptCredit)