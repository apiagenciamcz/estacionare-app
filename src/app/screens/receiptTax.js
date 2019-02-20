import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, StatusBar, View } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DetailsReceiptTax from '../components/template/detailsReceiptTax'
import BtnPrimary from '../components/buttons/btnPrimary'
import Loading from '../components/template/loading'

import { generateReceipt } from '../actions/TaxRegulationActions'

class ReceiptTax extends React.Component {

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
                <Loading loading={this.props.taxRegulation.loading}/>
                <DetailsReceiptTax item={this.props.taxRegulation.receipt}/>
                
                <View style={styles.buttons} >
                    <TouchableOpacity onPress={() => this.props.generateReceipt(this.props.taxRegulation.receipt)}>
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
    taxRegulation : state.taxRegulation,
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ generateReceipt }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptTax)