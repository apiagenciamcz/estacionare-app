import React from 'react';
import { 
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import WhiteCard from '../cards/cardWhite'
import { getFontSize } from '../../actions/UserActions'

class DetailsReceipt extends React.Component {

    componentDidMount(){
        this.props.getFontSize()
    }

    formatDate(data){
        const date = new Date(data)
        day = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()
        month = date.getDate() < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
        
        return `${day}/${month}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    }

    formatValue = (value) => {
        const val = value.toString().slice(0,4).split(".")
    
        if(Number(val[1]) < 10){
            val[1] = val[1] + '0'
        }
    
        return `R$ ${val[0]},${val[1]}`
    }

    render() {
        const { city, car, area, time, value } = this.props.item
        const { init, limit} = time
        const { fontSize } = this.props.user

        return (
            <WhiteCard>

                <Text style={[styles.titleCard, { fontSize:18*fontSize }]}>COMPROVANTE</Text>

                <View style={styles.row}>  
                    <Text style={[styles.label, { fontSize:13*fontSize }]}>Cidade</Text>
                    <Text style={[styles.text, { fontSize:16*fontSize }]}>{city}</Text>
                </View>

                <View style={styles.row}>  
                    <Text style={[styles.label, { fontSize:13*fontSize }]}>Placa</Text>
                    <Text style={[styles.text, { fontSize:16*fontSize }]}>{car}</Text>
                </View>

                <View style={styles.row}>  
                    <View style={styles.blue}>
                        <Text style={[styles.label, { fontSize:13*fontSize }]}>Setor</Text>
                        <Text style={[styles.text, styles.textWhite]}>{area.name}</Text>
                    </View>
                </View>

                <View style={styles.row}>  
                    <Text style={[styles.label, { fontSize:13*fontSize }]}>De</Text>
                    <Text style={[styles.text, { fontSize:16*fontSize }]}>{this.formatDate(init)}</Text>
                </View>

                <View style={styles.row}>  
                    <Text style={[styles.label, { fontSize:13*fontSize }]}>Até</Text>
                    <Text style={[styles.text, { fontSize:16*fontSize }]}>{this.formatDate(limit)}</Text>
                </View>

                <View style={styles.row}>  
                    <Text style={[styles.label, { fontSize:13*fontSize }]}>Total</Text>
                    <Text style={[styles.textVal, { fontSize:16*fontSize }]}>{this.formatValue(value)}</Text>
                </View>

            </WhiteCard> 
        )
    }
}

const styles = StyleSheet.create({

    titleCard: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },

    row:{
        flexDirection:'row',
        justifyContent: 'space-between',        
        alignItems: 'center',
        width: '100%',
        height: 46,
        position:'relative'
    },

    label:{
        color: '#6E6E6E',
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
    },

    text:{
        color: '#2B2B2B',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },

    textVal:{
        color: '#600343',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',   
    },
        
    blue: {
        backgroundColor: '#0FA3FF',
        position:'absolute',
        width: '115.5%',
        top: 46,
        left: -20,
        top: 0,
        paddingLeft: 20,
        paddingRight: 20,
        height: 46,
        flexDirection:'row',
        justifyContent: 'space-between',        
        alignItems: 'center',
    },

    textWhite:{
        color:'white'
    },

});

const mapStateToProps = state => ({
    user : state.user,
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getFontSize }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsReceipt)