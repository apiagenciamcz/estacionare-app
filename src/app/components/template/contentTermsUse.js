import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getFontSize } from '../../actions/UserActions'

class ContentTermsUse extends Component {

    componentDidMount(){
        this.props.getFontSize()
    }
    
    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={[styles.text]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis cursus nisl, ac sodales metus maximus ut. Donec augue felis, rhoncus ac nibh nec, malesuada volutpat nisl. Nunc suscipit porta leo at fringilla. Nullam commodo mi tortor, eget ultricies velit lobortis eget. Nunc vel rhoncus diam. Suspendisse hendrerit convallis massa nec dignissim. Vivamus eros lacus, semper in pharetra ut, scelerisque a massa. Sed venenatis posuere luctus. Nulla commodo et lorem vitae mollis. Praesent tristique imperdiet lacus a suscipit. Etiam id urna vitae dui aliquam condimentum. Donec porttitor efficitur purus non sagittis. Donec gravida varius turpis. In condimentum erat at tellus dignissim, vitae venenatis nulla faucibus. Nunc luctus magna a purus scelerisque tincidunt. {"\n"}
                        {"\n"}
                        Praesent vel orci id nunc eleifend lacinia. Vivamus lectus mi, commodo et metus quis, condimentum molestie nibh. Suspendisse vel feugiat tortor. Etiam lacinia consequat cursus. Aliquam tincidunt congue odio, nec egestas erat mattis ut. Integer molestie nisl at ipsum cursus, ac consequat libero tempus. 
                    </Text>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    title:{
        color:'#2B2B2B',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },

    text:{
        fontSize: 12,
        color:'#6E6E6E',
        fontFamily: 'Poppins-Regular',
        lineHeight: 18
    },

});

const mapStateToProps = state => ({
    user : state.user,
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getFontSize }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentTermsUse)