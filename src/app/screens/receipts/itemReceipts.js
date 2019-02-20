import React from 'react';
import { 
    StyleSheet,
    ImageBackground,
    StatusBar,
    View,
    TouchableOpacity
} from 'react-native';

import DetailsReceipt from '../../components/template/detailsReceipt'
import DetailsReceiptCredit from '../../components/template/detailsReceiptCredit'
import DetailsReceiptTax from '../../components/template/detailsReceiptTax'

import BtnPrimary from '../../components/buttons/btnPrimary'
import IconLeft from '../../components/buttons/iconLeft'

import RNPrint from 'react-native-print';

export default class ItemReceipts extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTransparent: true,
        headerLeft: <IconLeft navigation={navigation} type='light'/>
    })

    async printPDF(receipt, type) {
        let html = ''

        if(type == 'credit'){
            html = "<h1>COMPROVANTE DE CREIDITO</h1>" +
                    "<table border='0' cellpadding='0' cellspacing='0'>" +
                        "<tbody>"+
                            "<tr>"+
                                "<td align='left'> "+
                                    "<table border='0' cellpadding='0' cellspacing='0'> "+
                                        "<tbody>" +
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Número do cartão</h2>"+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.card+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Data da recarga</h2> "+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+new Date(receipt.date)+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Valor Recarregado</h2> "+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+`R$ ${receipt.value},00`+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                        "</tbody> "+
                                    "</table> "+
                                "</td> "+
                            "</tr> "+
                        "</tbody> "+
                    "</table>"

        }else if(type == 'taxRegulation'){ 
            html = "<h1>COMPROVANTE DE REGULARIZAÇÃo</h1>" +
                    "<table border='0' cellpadding='0' cellspacing='0'>" +
                        "<tbody>"+
                            "<tr>"+
                                "<td align='left'> "+
                                    "<table border='0' cellpadding='0' cellspacing='0'> "+
                                        "<tbody>" +
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Cidade</h2>"+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.city+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Placa</h2>"+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.car+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Setor</h2>"+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.area+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Número do Aviso</h2>"+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.alertNumber+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Data</h2> "+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+new Date(receipt.date)+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Valor</h2> "+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+`R$ ${receipt.value},00`+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                        "</tbody> "+
                                    "</table> "+
                                "</td> "+
                            "</tr> "+
                        "</tbody> "+
                    "</table>"

        }else if(type == 'receipt'){
            html = "<h1>COMPROVANTE DE PARQUIMETRO</h1>" +
                    "<table border='0' cellpadding='0' cellspacing='0'>" +
                        "<tbody>"+
                            "<tr>"+
                                "<td align='left'> "+
                                    "<table border='0' cellpadding='0' cellspacing='0'> "+
                                        "<tbody>" +
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Cidade</h2>"+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.city+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Placa</h2>"+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.car+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Setor</h2>"+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.area.name+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Data inicio</h2> "+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+new Date(receipt.time.init)+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Data final</h2> "+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+new Date(receipt.time.limit)+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                            "<tr>"+
                                                "<td>"+
                                                    "<h2>Total</h2> "+
                                                "</td>"+
                                                "<td>"+
                                                    "<p>"+receipt.value+"</p> "+
                                                "</td>"+
                                            "</tr> "+
                                        "</tbody> "+
                                    "</table> "+
                                "</td> "+
                            "</tr> "+
                        "</tbody> "+
                    "</table>"
        }

        await RNPrint.print({
            html: html,
        })
    }

    render() {
        const { receipt } = this.props.navigation.state.params
        const { type } = receipt

        return (
            <ImageBackground source={require("../../images/background.png")} style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <View style={styles.cards}>
                    {type == 'credit' && 
                        <DetailsReceiptCredit item={receipt}/>
                    }

                    {type == 'taxRegulation' && 
                        <DetailsReceiptTax item={receipt}/>
                    }

                    {type == 'receipt' && 
                        <DetailsReceipt item={receipt}/>
                    }
                    
                </View>

                <View style={styles.buttons} >
                    <TouchableOpacity onPress={() => this.printPDF(receipt, type)}>
                        <BtnPrimary text='BAIXAR'  />
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

    buttons: {
        height: 140,
        justifyContent: 'center',        
        alignItems: 'center',
    },

    cards: {
        marginTop: 80
    }

});
