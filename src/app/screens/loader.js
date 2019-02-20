import React from 'react';
import { AsyncStorage, StyleSheet, ImageBackground, Animated, Image, View } from 'react-native';
import firebase from 'react-native-firebase';

export default class Loader extends React.Component {

    state = {
        opacity: [
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0)
        ],
        translateX: [
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40),
            new Animated.Value(-40)
        ],
    }

    constructor(props){
        super(props)
        this.initAnimation()
    }

    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
    
    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');

        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
      
    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    initAnimation = () => {

        let i = 0
        
        let time = setInterval(() => {
            if(i < this.state.translateX.length){

                Animated.timing(this.state.opacity[i], {
                        toValue: 1, 
                        duration: 200
                    }
                ).start()

                Animated.timing(this.state.translateX[i], {
                        toValue: 0, 
                        duration: 200
                    }
                ).start()

                i++

            } else{

                clearInterval(time)

                AsyncStorage.getItem('LoggedUser').then((logged) => {
                    console.log(logged)

                    if(logged){
                        AsyncStorage.getItem('CurrentUser').then((userID) => {
                            if(userID){
                                AsyncStorage.getItem('fcmToken').then((fcmToken) => {
                                    firebase.database().ref(`users/${userID}/deviceToken`).once('value').then((snapshot) => {
                                        if(fcmToken === snapshot.val()){
                                            clearInterval(time)
                                            this.props.navigation.navigate('Home')
                                        }else{
                                            firebase.database().ref(`users/${userID}`).update({
                                                deviceToken: fcmToken
                                            }).then(() => {
                                                clearInterval(time)
                                                this.props.navigation.navigate('Home')
                                            })
                                        }
                                    }).catch(error => {
                                        clearInterval(time)
                                        this.props.navigation.navigate('Welcome')
                                    })
                                })
                            }else{
                                clearInterval(time)
                                this.props.navigation.navigate('Welcome')
                            }
                        })
                    }else{
                        clearInterval(time)
                        this.props.navigation.navigate('Welcome')
                    }
                    
                })
            }

        },200);
        
    }

    componentDidMount = () => {
        this.checkPermission();
        console.disableYellowBox = true;
    }

    render() {
        return (
            <ImageBackground source={require("../images/background.png")} style={styles.container}>
                <View style={{ alignItems: 'baseline', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Animated.Image style={{ alignSelf: 'center', opacity: this.state.opacity[0], transform: [{ translateX: this.state.translateX[0] }] }} source={require("../images/logo/e.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[1], transform: [{ translateX: this.state.translateX[1] }] }} source={require("../images/logo/s.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[2], transform: [{ translateX: this.state.translateX[2] }] }} source={require("../images/logo/t.png")}  />
                    <Animated.Image style={{ opacity: this.state.opacity[3], transform: [{ translateX: this.state.translateX[3] }] }} source={require("../images/logo/a.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[4], transform: [{ translateX: this.state.translateX[4] }] }} source={require("../images/logo/c.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[5], transform: [{ translateX: this.state.translateX[5] }] }} source={require("../images/logo/i.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[6], transform: [{ translateX: this.state.translateX[6] }] }} source={require("../images/logo/o.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[7], transform: [{ translateX: this.state.translateX[7] }] }} source={require("../images/logo/m.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[8], transform: [{ translateX: this.state.translateX[8] }] }} source={require("../images/logo/o.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[9], transform: [{ translateX: this.state.translateX[9] }] }} source={require("../images/logo/b.png")} />
                    <Animated.Image style={{ opacity: this.state.opacity[10], transform: [{ translateX: this.state.translateX[10] }] }} source={require("../images/logo/i.png")} />
                </View>
            </ImageBackground>
        )
    }

}

// Later on in your styles..
const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
});