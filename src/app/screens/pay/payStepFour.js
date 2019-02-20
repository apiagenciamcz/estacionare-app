import React from 'react'
import { StyleSheet, ImageBackground, StatusBar, Image, View, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import WhiteCard from '../../components/cards/cardWhite'
import TitleCard from '../../components/cards/cardTitle'
import Pay from '../../components/buttons/pay'
import IconLeft from '../../components/buttons/iconLeft'

import { init, number, save, update } from '../../actions/TimeActions'
import { getFontSize } from '../../actions/UserActions'

class PayStepFour extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTransparent: true,
        headerLeft: <IconLeft navigation={navigation} type='light'/>
    })

    componentDidMount(){
        this.props.getFontSize()

        const { receipt, isTime } = this.props.home
        const { area, time } = receipt

        if(isTime){
            this.props.init(area.value, time.limit)
        }else{
            this.props.init(this.props.receipt.area.value, false)
        }

    }

    render() {
        const { fontSize } = this.props.user
        const { time, value, initialValue, finalHour, finalValue, limitTime, disableFirst } = this.props.time
        let minTime = parseFloat(time) <= 0.50 ? true : false
        let maxTime = parseFloat(time) == limitTime ? true : false
        let funcNext = this.props.home.isTime ? 'update' : 'save' 

        if(minTime && disableFirst){
            Alert.alert(
                'O mínimo de tempo para o parquímetro são 30 minutos',
            )
        }
    
        if(maxTime && disableFirst){
            Alert.alert(
                'O máximo de tempo para o parquímetro são 2 horas',
            )
        }
        
        return (
            <ImageBackground source={require("../../images/background.png")} style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <View style={styles.relative}>

                    <WhiteCard style={styles.relative}> 
                        <TitleCard text="Qual tempo você deseja ficar?" offset="4" limit="4" />

                        <View style={styles.contentTime}>
                            <View style={styles.bounce}>
                                <View style={styles.circle}></View>
                                <Text style={styles.time}>{finalHour}</Text>
                            </View>
                        </View>

                        <View style={styles.controllers}>

                            <TouchableOpacity 
                                style={styles.buttonController} 
                                onPress={() => this.props.number('-', time, initialValue, value, minTime )} 
                                disabled={minTime}>

                                <Image source={require("../../images/reduce.png")} />

                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.buttonController} 
                                onPress={() => this.props.number('+', time, initialValue, value, maxTime )} 
                                disabled={maxTime}>

                                <Image source={require("../../images/increment.png")} />
                                
                            </TouchableOpacity>

                        </View>

                        <View style={styles.baseVal}>
                            <Text style={[styles.titleVal, { fontSize: 10*fontSize } ]}>ESSE TEMPO EQUIVALE A</Text>
                            <Text style={[styles.value, { fontSize: 29*fontSize }]}>{finalValue}</Text>
                        </View>

                    </WhiteCard>

                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.props[funcNext](time, value)}>
                        <Pay />
                    </TouchableOpacity> 
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
    },

    bounce: {
        position:'relative',
        width: 144,
        height: 144,
        borderRadius:144,
        backgroundColor:'#E6EEF4',
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle:{
        width: 68,
        height: 68,
        borderRadius:68,
        backgroundColor:'#BBCFE1',
        position:'absolute',
        left:'50%',
        top:'50%',
        transform: [
            { translateX:-34 },
            { translateY:-34 }
        ] 
    },

    time:{
        fontSize:40,
        color:'#125894',
        fontFamily: 'Poppins-Bold',
    },

    contentTime:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    controllers:{
        marginTop: 9,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    buttonController:{
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#C3D5E4',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 11,
        marginRight: 11,
    },

    baseVal:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:16,
        marginTop:16,
        borderTopWidth: 1,
        borderColor: '#F0F0F0',
        width: '100%',
    },

    titleVal:{
        color: '#6E6E6E',
        fontSize: 10,
        fontFamily: 'Poppins-Bold',
    },
    
    value:{
        color: '#125894',
        fontSize: 29,
        fontFamily: 'Poppins-Bold',
    },

    relative: { 
        marginTop: 80
    },
    
    buttons:{
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    }

})

const mapStateToProps = state => ({
    time : state.time,
    receipt : state.receipt,
    home : state.home,
    user : state.user,
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ init, number, save, update, getFontSize }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PayStepFour)