// React 
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

// Redux 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components 
import FontAwesome, { Icons } from 'react-native-fontawesome'

// Actions 
import { changeScreen, toggleMenu } from '../../actions/MenuActions'

class Toolbar extends Component {

	constructor(props) {
        super(props)
    }

    render(){
        return (
            <View style={styles.menuBottom}>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.changeScreen('MapHome')}>
                    <View style={styles.baseIcon}>
                        <FontAwesome style={styles.iconMenu}>{Icons.mapMarker}</FontAwesome>
                    </View>
                </TouchableOpacity>        

                <TouchableOpacity style={styles.btn} onPress={() => this.props.changeScreen('Home') }>
                    <View style={styles.baseIcon}>
                        <FontAwesome style={styles.iconMenu}>{Icons.clockO}</FontAwesome>
                    </View>
                </TouchableOpacity>        

                <TouchableOpacity style={styles.btn} disabled={this.props.disableTime} onPress={() => this.props.changeScreen(this.props.time ? 'PayStepFour' : 'PayStepOne') }>
                    <View style={styles.payment}>
                        <FontAwesome style={styles.iconPay}>{Icons.usd}</FontAwesome>
                    </View>
                </TouchableOpacity>      

                <TouchableOpacity style={styles.btn} onPress={() => this.props.changeScreen('TaxRegulation') }>
                    <View style={styles.baseIcon}>
                        <FontAwesome style={styles.iconMenu}>{Icons.qrcode}</FontAwesome>
                    </View>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.openDrawer()}>
                    <View style={styles.baseIcon}>
                        <FontAwesome style={styles.iconMenu}>{Icons.bars}</FontAwesome>
                    </View>
                </TouchableOpacity>    

            </View>
        )
    }
}


const styles = StyleSheet.create({

    menuBottom: {
        backgroundColor: '#2B2B2B',
        flexDirection:'row',
        justifyContent: 'center',        
        alignItems: 'center',
        height: 74,
    },

    btn: {
        justifyContent: 'space-between',        
        alignItems: 'stretch',
        flex: 1,
        width: '20%'
    },
    
    payment: {
        backgroundColor: '#FFA015',
        borderRadius: 74,
        height: 74,
        width: '100%',
        justifyContent: 'center',        
        alignItems: 'center',
    },  

    baseIcon: {
        height: 74,
        justifyContent: 'center',        
        alignItems: 'center',
    },

    iconMenu: {
        fontSize: 22,
        color:'white',
    },

    iconPay: {
        fontSize: 30,
        color:'white', 
    }

});

const mapStateToProps = state => ({
    menu : state.menu
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ changeScreen, toggleMenu }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)