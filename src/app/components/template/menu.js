// React 
import React, { Component } from 'react'
import { StyleSheet, Image, View,Text, TouchableOpacity, AsyncStorage, Platform } from 'react-native'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin'
import { LoginManager } from 'react-native-fbsdk' 

// Redux 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components 
import FontAwesome, { Icons } from 'react-native-fontawesome'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

// Actions 
import { getUser, getFontSize } from '../../actions/UserActions'
import { changeScreen, toggleMenu } from '../../actions/MenuActions'

const options = {
    title: 'Selecionar imagem de perfil',
    takePhotoButtonTitle: 'Use sua câmera',
    chooseFromLibraryButtonTitle: 'Escolha uma foto na biblioteca',
    maxWidth: 480,
    maxHeight: 480,
    quality: 1,
};

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class Menu extends Component {

	constructor(props) {
        super(props)
    }

    logout(navigation){
        let user = firebase.auth().currentUser;
        let provider = user._user.providerData[0].providerId
        AsyncStorage.removeItem('CurrentUser')
        AsyncStorage.removeItem('LoggedUser')

        if(provider == 'google.com'){
            GoogleSignin.revokeAccess().then(() =>
                GoogleSignin.signOut()
                            .then(() => {
                                navigation.closeDrawer()

                                setTimeout(()=>{
                                    navigation.navigate('Welcome')
                                },1000)

                            })
                            .catch(err => console.error('sum tim wong', err))
            ).catch(err => console.error('revokeAccess', err));
        } 
        else if(provider == 'facebook.com'){
            LoginManager.logout((data) => {
                navigation.closeDrawer()

                setTimeout(()=>{
                    navigation.navigate('Welcome')
                },1000)
            })
        } 
        else{
            firebase.auth().signOut()
                           .then(() => {
                                navigation.closeDrawer()

                                setTimeout(()=>{
                                    navigation.navigate('Welcome')
                                },1000)

                            })
                            .catch(err => console.error('sum tim wong', err))
        }

    }

    componentDidMount(){
        this.props.getUser()
        this.props.getFontSize()

        GoogleSignin.configure({
            iosClientId: "307321601096-jpocbm5rtt137d4mgpkdi03troq82rb0.apps.googleusercontent.com",
            androidClientId: "307321601096-7o2jnm2kpgg3318ri9d1ok3qhinbbhnj.apps.googleusercontent.com"
        }).then (() => { 
            dispatch({
                type: 'CONFIGURED_GOOGLE_SIGN'
            }) 
        }) 
    }

    uploadImage = (uri, imageName, mime = 'image/jpg') => {
        console.log(uri)
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file:///', '') : uri
            AsyncStorage.getItem('CurrentUser').then((userID) => {                
                const imageRef = firebase.storage().ref(`users/${userID}/`).child(imageName)
                fs.readFile(uploadUri, 'base64')
                    .then(() => {
                        return imageRef.put(uploadUri, { contentType: mime })
                    })
                    .then(() => {
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                        resolve(url)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        })
      }

    takePicture = () => {
        
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let resPath = Platform.OS === 'ios' ? 'uri' : 'path'
                this.uploadImage(response[resPath], response.fileName).then((res) => {
                    console.log(res)
                    firebase.auth().currentUser.updateProfile({
                        photoURL: res
                    }).then(() => {
                        this.props.getUser()
                    })
                })
            }   
        });
    };
    
    render(){
        const {navigation} = this.props.children.props
        const { fontSize } = this.props.user

        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.btnPrev} onPress={() => navigation.closeDrawer()}>
                    <FontAwesome style={styles.iconMenu}>{Icons.chevronRight}</FontAwesome>
                </TouchableOpacity>    

                <View style={styles.align}>

                    <View style={styles.baseProfile}>
                        <TouchableOpacity onPress={this.takePicture.bind(this)}>
                            {this.props.user.user.photoURL 
                                ? 
                                    <Image style={{width: 74, height: 74, marginBottom: 20}} borderRadius={52} source={{uri: this.props.user.user.photoURL }}></Image>
                                :
                                    <Image style={{ marginBottom: 20}} source={require('../../images/default-user.png')}></Image>
                            }
                        </TouchableOpacity>
                        <Text style={[styles.titleName, { fontSize: 18*fontSize } ]}>{ this.props.user.name }</Text>
                    </View>

                    <View>
                        {this.props.children}
                    </View>

                    <View style={styles.ViewBrown}>
                        <TouchableOpacity onPress={() => this.logout(navigation)} >
                            <Text style={styles.TextBrown}>SAIR</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    align: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },

    baseProfile: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },

    navMenu: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingBottom: 10,        
    },

    btnMenu: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 43,
        borderWidth: 1,
        borderBottomColor: '#F0F0F0',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },

    titleName: {
        color: '#2B2B2B',
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Poppins-SemiBold',
    },

    iconListMenu: {
        fontSize: 11,
        color: '#6E6E6E',
        marginRight: 10,
        width: '10%',
    }, 

    link: {
        color: '#6E6E6E',
        fontFamily: 'Poppins-Regular',
        lineHeight: 43,
    },

    ViewBrown: {
        backgroundColor: '#FFA015',
        width: 100,
        height: 42,
        borderRadius: 42,
        marginLeft: 40,
        marginBottom: 40,
    },

    TextBrown: {
        color:'#FFFFFF',
        lineHeight: 42,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },

    btnPrev: {
        position: 'absolute',
        left: 20,
        top: 20,
        fontSize: 20,
        zIndex: 200
    },

});

const mapStateToProps = state => ({
    user : state.user,
    menu : state.menu
})

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getUser, changeScreen, toggleMenu, getFontSize }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)