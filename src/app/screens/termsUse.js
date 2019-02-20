import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import ContentTermsUse from '../components/template/contentTermsUse'

import Header from '../components/template/header';

export default class TermsUse extends React.Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'TERMOS DE USO',
    })

    render() {
        return (
            <View style={styles.main}>
                <StatusBar backgroundColor="black" barStyle="dark-content" />
                <Header navigation={this.props.navigation} title='TERMOS DE USO'/>        
                <View style={styles.align}>
                    <ContentTermsUse />
                </View>        
            </View>
        );
    }
}

const styles = StyleSheet.create({

    main:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },

    align: {
        paddingHorizontal: 24
    }

});
