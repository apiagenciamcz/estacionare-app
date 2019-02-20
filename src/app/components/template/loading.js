// React 
import React, { Component } from 'react'
import { StyleSheet, Modal, Image, View } from 'react-native'

export default class Loading extends Component {

    render(){
        return (
            <Modal
                onRequestClose={() => null}
                transparent={true}
                animationType={'none'}
                visible={this.props.loading}>

                <Image style={{ flex: 1, maxWidth: '100%' }} source={require('../../images/loader.gif')} />

            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

});