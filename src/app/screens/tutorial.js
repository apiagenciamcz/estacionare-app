
// React 
import React from 'react';
import { StyleSheet, Animated, View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native'

// Redux 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FontAwesome, { Icons } from 'react-native-fontawesome'

import { tutorialInit } from '../actions/TutorialActions'
  
class Tutorial extends React.Component {

    static navigationOptions = {
        title: 'Tutorial',
        header: null
    }

    componentDidMount = () => {
        let { styleOpacity, nextTutorial } = this.props.tutorial
        this.props.tutorialInit(styleOpacity[nextTutorial], nextTutorial)
    }

    render() {
        let { styleOpacity, nextTutorial } = this.props.tutorial

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>TUTORIAL</Text>
                </View>

                <TouchableOpacity style={styles.baseButton} onPress={() => this.props.tutorialInit(styleOpacity[nextTutorial], nextTutorial)}>
                    <Text style={styles.titleButton}>Próxima dica</Text>
                    <FontAwesome style={styles.iconButton}>{Icons.chevronRight}</FontAwesome>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextScreenButton} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.nextScreenText}>PULAR TUTORIAL</Text>
                </TouchableOpacity>

                <Animated.Image resizeMode='stretch' source={require("../images/tutorialOne.png")} style={[styles.image,{ opacity: styleOpacity.one }]}></Animated.Image>
                <Animated.Image resizeMode='stretch' source={require("../images/tutorialTwo.png")} style={[styles.image,{ opacity: styleOpacity.two }]}></Animated.Image>
                <Animated.Image resizeMode='stretch' source={require("../images/tutorialThree.png")} style={[styles.image,{ opacity: styleOpacity.three }]}></Animated.Image>
                <Animated.Image resizeMode='stretch' source={require("../images/tutorialFour.png")} style={[styles.image,{ opacity: styleOpacity.four }]}></Animated.Image>
                <Animated.Image resizeMode='stretch' source={require("../images/tutorialFive.png")} style={[styles.image,{ opacity: styleOpacity.five }]}></Animated.Image>
                <Animated.Image resizeMode='stretch' source={require("../images/tutorialSix.png")} style={[styles.image,{ opacity: styleOpacity.six }]}></Animated.Image>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        position: 'relative'
    },

    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    },  

    baseButton: {
        position: 'absolute',
        bottom: 100,
        right: -20,
        zIndex: 1000,
        backgroundColor: '#0EA9AC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 14,
        paddingLeft: 16,
        paddingRight: 28,
        borderRadius: 28
    },  

    titleButton:{
        color: '#fff',  
        fontSize: 14,
        marginRight: 6
    },

    iconButton:{
        color: '#fff',  
        fontSize: 16,
    },

    nextScreenButton:{
        position: 'absolute',
        bottom: 70,
        right: 5,
        zIndex: 1000,
    },      

    nextScreenText:{
        fontSize: 12,
        color: '#fff',  
    },

    titleView:{
        position: 'absolute',
        width: '100%',
        top: 30,
        zIndex: 100
    },

    titleText:{
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    }

});

const mapStateToProps = state => ({
    tutorial: state.tutorial
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        tutorialInit,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)