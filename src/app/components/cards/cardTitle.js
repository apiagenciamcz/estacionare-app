import React from 'react'
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class TitleCard extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.titles}>
                <View style={styles.posTitles}>
                    <Text style={styles.number}>{ this.props.offset }</Text><Text style={styles.countNumber}>/{ this.props.limit }</Text>
                </View>
                <Text style={styles.titleCard}> 
                    { this.props.text }
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    titles:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    
    posTitles:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
        flex:1
    },
    
    number:{
        color: '#125894',
        fontSize: 40,
        fontFamily: 'Poppins-Bold',
    },

    countNumber:{
        color:'#F2F2F2',
        fontSize: 34,
    },

    titleCard: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color:'#2B2B2B',
        flex:3
    },

});
