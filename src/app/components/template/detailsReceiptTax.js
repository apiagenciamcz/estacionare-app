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

class DetailsReceiptTax extends React.Component {

    componentDidMount(){
        this.props.getFontSize()
    }

    formatDate(data){
        const date = new Date(data)
        day = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()
        month = date.getDate() < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
        
        return `${day}/${month}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    }

    render() {
        const { date, value, alertNumber, area, city, car } = this.props.item
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
                        <Text style={[styles.text, styles.textWhite, { fontSize:16*fontSize }]}>{area}</Text>
                    </View>
                </View>

                <View style={styles.row}>  
                    <Text style={[styles.label, { fontSize:13*fontSize }]}>Número do{'\n'}Aviso</Text>
                    <Text style={[styles.text, { fontSize:16*fontSize }]}>{alertNumber}</Text>
                </View>

                <View style={styles.row}>  
                    <Text style={[styles.label, { fontSize:13*fontSize }]}>Data</Text>
                    <Text style={[styles.text, { fontSize:16*fontSize }]}>{this.formatDate(date)}</Text>
                </View>

                <View style={styles.row}>  
                    <Text style={[styles.label, { fontSize:13*fontSize }]}>Valor</Text>
                    <Text style={[styles.textVal, { fontSize:16*fontSize }]}>{`R$ ${value},00` }</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsReceiptTax)