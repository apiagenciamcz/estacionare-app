// React
import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Switch } from 'react-native'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components
import Header from '../components/template/header'

// Actions
import { getNotificationsUser, changeNotificationUser } from '../actions/UserActions'
import { getFontSize } from '../actions/UserActions'

class Notifications extends Component {

    static navigationOptions = () => ({
        title: 'NOTIFICAÇÕES',
    })

    componentDidMount(){
        this.props.getNotificationsUser()
        this.props.getFontSize()
    }

    render(){
        const { fontSize } = this.props.user

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="dark-content" />
                <Header navigation={this.props.navigation} title='NOTIFICAÇÕES'/>

                <View style={styles.formControl}>
                    <Text style={[styles.label,{ fontSize: 13*fontSize }]}>SINAIS SONOROS</Text>
                    <Switch value={this.props.user.notifications.beeps} onValueChange={val => this.props.changeNotificationUser('beeps',val)} />
                </View>

                <View style={[styles.formControl, styles.border]}>
                    <Text style={[styles.label,{ fontSize: 13*fontSize }]}>VIBRAÇÕES</Text>
                    <Switch value={this.props.user.notifications.vibration} onValueChange={val => this.props.changeNotificationUser('vibration',val)}/>
                </View>

                <View style={[styles.formControl, styles.border]}>
                    <Text style={[styles.label,{ fontSize: 13*fontSize }]}>ALERTA DE PARQUÍMETRO</Text>
                    <Switch value={this.props.user.notifications.parkingMeterAlert} onValueChange={val => this.props.changeNotificationUser('parkingMeterAlert',val)}/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    formControl: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 22,
        height: 96
    },

    label: {
        color: '#2B2B2B',
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
    },

    border: {
        borderTopWidth: 1,
        borderColor: '#E0E0E0'
    }

})

const mapStateToProps = state => ({
    user : state.user
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getNotificationsUser, changeNotificationUser, getFontSize }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)