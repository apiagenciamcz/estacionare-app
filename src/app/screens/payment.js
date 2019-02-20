import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../components/template/header';
import BtnPrimary from '../components/buttons/btnPrimary'

import { getCardsUser, cardEdit, getFontSize } from '../actions/UserActions'

class Payment extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'PAGAMENTO',
    })

    componentDidMount(){
        this.props.getFontSize()
        this.props.getCardsUser()
    }

    render(){
        const { cards, fontSize } = this.props.user

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="dark-content" />
                <Header navigation={this.props.navigation} title='PAGAMENTO'/>

                <View style={styles.infos}>

                    {cards && Object.keys(cards).map((index) => {
                        let item  = cards[index]
                        return (
                            <TouchableOpacity key={index} onPress={() => this.props.cardEdit(index) }>
                                <View style={styles.formControl}>
                                    <Text style={[styles.flag, { fontSize: 16*fontSize }]}>{item.flag}</Text>
                                    <Text style={[styles.label, { fontSize: 14*fontSize }]}>{item.name}</Text>
                                    <Text style={[styles.number, { fontSize: 10*fontSize }]}>{ item.num.replace(item.num.slice(0,14), '**** **** ****') }</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
 
                </View>

                <View style={styles.buttons}> 
                    <TouchableOpacity onPress={() => this.props.cardEdit('new') }>
                        <BtnPrimary text='ADICIONAR NOVO MÉTODO'/>
                    </TouchableOpacity>
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

    infos: {
        flex: 6
    },

    formControl: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 22,
        height: 96,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0'
    },

    label: {
        color: '#2B2B2B',
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },

    flag: {
        color: '#CDCDCD',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBolditalic',
    },

    number: {
        color: '#2B2B2B',
        fontSize: 10,
        fontFamily: 'Poppins-SemiBold',
    },

    image: {
        marginRight: 14,
        opacity: .2 ,
        width: 48,
        height: 48,
        flex:1,
    },

    buttons: {
        flex: 2, 
        alignItems: 'center',
        justifyContent: 'center',
    },

    ViewBrown: {
        backgroundColor: '#3A1A00',
        marginBottom: 13,
        width: 300,
        height: 62,
        borderRadius: 62,
        marginTop: 13
    },

    TextBrown: {
        color: '#F49810',
        lineHeight: 62,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    
})

const mapStateToProps = state => ({
    user : state.user
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getCardsUser, cardEdit, getFontSize }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment)