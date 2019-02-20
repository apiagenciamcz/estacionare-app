// React 
import React from 'react';
import { StyleSheet, ImageBackground, StatusBar, View, Text, TouchableOpacity } from 'react-native'

// Redux 
import { connect } from 'react-redux'

// Components 
import FontAwesome, { Icons } from 'react-native-fontawesome'
import Toolbar from '../components/template/toolbar'

// Actions  
import { getReceipt, clearReceipt, getCredit, changeFlag } from '../actions/HomeActions'
import { getFontSize } from '../actions/UserActions'
 
class Home extends React.Component {

    static navigationOptions = {
        title: 'HOME',
        gesturesEnabled: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount = () =>{
        this.props.getReceipt()
        this.props.getFontSize()
    }

    componentWillUnmount = () => {
        this.props.clearReceipt()
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.receipt.flagStatus != nextProps.receipt.flagStatus){
            this.props.clearReceipt()
            
            setTimeout(() => {
                this.props.getReceipt()
                this.props.changeFlag()
            },1000)
        }

        if(this.props.money.flagStatus != nextProps.money.flagStatus){
            this.props.getCredit()
        }
    }

    render() {
        const { navigate } = this.props.navigation
        const { receipt, count, credit, limitTime } = this.props.home
        const { fontSize } = this.props.user
        const { city, car } = receipt

        return (
            <ImageBackground source={require("../images/background.png")} style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <View style={styles.cardWhite}>

                    <View style={styles.headerHome}>

                        <View style={styles.blackBox}>
                            <Text style={[styles.labelCash, { fontSize: 12*fontSize } ]}>SEU SALDO ATUAL É</Text>
                            <Text style={[styles.titleCash, { fontSize: 22*fontSize, lineHeight: 26*fontSize } ]}>{credit}</Text>
                        </View> 

                        <View style={styles.grayBox}>
                            <TouchableOpacity onPress={() => navigate('AddCredit')}>
                                <Text style={[styles.addCash, { fontSize: 10*fontSize } ]}>ADICIONAR SALDO</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    <View style={styles.boxWhite}>

                        <View style={styles.rowTimer}>
                            <FontAwesome style={styles.iconClock}>{Icons.clockO}</FontAwesome>
                            <Text style={[styles.timer, { fontSize: 44*fontSize } ]}>{ count }</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={[styles.index, { fontSize: 13*fontSize } ]}>Cidade</Text>
                            <Text style={[styles.text, { fontSize: 16*fontSize } ]}>{ city }</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={[styles.index, { fontSize: 13*fontSize } ]}>Placa</Text>
                            <Text style={[styles.text, { fontSize: 16*fontSize } ]}>{ car }</Text>
                        </View>

                    </View>

                </View>

                <Toolbar navigation={this.props.navigation} disableTime={ limitTime > .25 ? false : true } time={ count != '--:--:--' ? true : false } />

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
    },

    cardWhite:{
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flex: 1,
        paddingTop: 90
    },  

    headerHome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    blackBox:{
        borderTopRightRadius: 4,
        backgroundColor: '#2B2B2B',
        flex: 2,
        height: 72,
        padding: 24,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    labelCash: {
        color:'#6E6E6E',
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        lineHeight: 18
    },

    titleCash: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 22,
        lineHeight: 26
    },

    grayBox: {
        borderTopRightRadius: 4,
        flex: 1,
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
    },

    addCash: {
        fontSize: 12,
        color:'#2B2B2B',
        fontFamily: 'Poppins-Bold',
        padding: 12
    },

    buttons: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxWhite: {
        backgroundColor: 'white',    
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowTimer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 95
    },

    timer: {
        fontSize: 44,
        fontFamily: 'Poppins-Bold',
        lineHeight: 95,
        color: '#0FA3FF'
    },

    iconClock: {
        marginRight: 25,
        fontSize: 44,
        lineHeight: 95,
        color: '#0FA3FF'
    },

    row:{
        flexDirection:'row',
        justifyContent: 'space-between',        
        alignItems: 'stretch',
        width: '100%',
        height: 69,
        paddingLeft: 17,
        paddingRight: 17,
        borderWidth: 1,
        borderTopColor: '#F0F0F0',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },

    index: { 
        paddingLeft: 17,
        lineHeight: 69,
        color: '#6E6E6E',
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
    },

    text:{
        paddingRight: 17,
        lineHeight: 69,
        color: '#2B2B2B',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },

    base: {
        backgroundColor: 'rgba(0, 0, 0, .5)', 
        height: '100%',    
        width: '100%'
    },

    flexing: {
        width: '80%',
        height: '100%',    
        backgroundColor: 'white', 
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20,
        position: 'absolute',

    },

})

const mapStateToProps = state => ({
    receipt : state.receipt,
    home : state.home,
    menu: state.menu,
    user: state.user,
    money: state.money
})

const mapDispatchToProps = {
    getReceipt,
    clearReceipt,
    getCredit,
    getFontSize,
    changeFlag
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home)

