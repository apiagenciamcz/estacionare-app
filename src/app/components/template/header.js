// React 
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

// Components 
import IconLeft from '../buttons/iconLeft'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getFontSize } from '../../actions/UserActions'

class Header extends Component {

    componentDidMount(){
        this.props.getFontSize()
    }

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.iconAlign}>
                    <IconLeft nav='Home' type='dark' navigation={this.props.navigation} />
                </View>

                <View style={styles.base}><Text style={styles.title}>{this.props.title}</Text></View>

            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30,
        position: 'relative'
    },

    title:{
        fontFamily: 'Poppins-Semibold',
        color: '#2B2B2B',
        fontSize: 15,
        textAlign: 'center',
    },

    iconAlign: {
        top: 30,
        left: 0,
        position: 'absolute'
    }

});

const mapStateToProps = state => ({
    user : state.user,
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getFontSize }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)