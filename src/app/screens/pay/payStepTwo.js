import React from 'react';
import { StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import WhiteCard from '../../components/cards/cardWhite'
import TitleCard from '../../components/cards/cardTitle'
import IconLeft from '../../components/buttons/iconLeft'

import { getCars, setCar } from '../../actions/CarsActions'
import { getFontSize } from '../../actions/UserActions'

class PayStepTwo extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTransparent: true,
        headerLeft: <IconLeft navigation={navigation} type='light' />
    })

    componentDidMount(){
        this.props.getCars()
        this.props.getFontSize()
    }

    render() {
        const { allCars } = this.props.car
        const { fontSize } = this.props.user
        
        return (
            <ImageBackground source={require("../../images/background.png")} style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <WhiteCard>

                    <TitleCard text="Selecione sua placa" offset="2" limit="4" />

                    { Object.values(allCars).map((item, index) =>
                        <TouchableOpacity style={styles.input} onPress={() => this.props.setCar(item.name)} key={index}>
                            <Text style={[styles.label,{ fontSize: 16*fontSize }]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ) }

                </WhiteCard>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    input:{
        width: '100%',
        height: 58,
        borderColor: '#C9C9C9',
        borderWidth: 1,
        marginTop: 19,
    },
    
    label:{
        fontSize: 16,
        lineHeight: 58,
        color: '#2B2B2B',
        fontFamily: 'Poppins-Medium',
        textAlign:'center'
    },

    addBoard: {
        backgroundColor: '#D0EEEF',
        height: 48,
        borderRadius: 48,
        marginTop: 30
    },

    TextAddBoard: {
        color:'#008083',
        lineHeight: 48,
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
    },

});

const mapStateToProps = state => ({
    car : state.car,
    user : state.user,
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getCars, setCar, getFontSize }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PayStepTwo)