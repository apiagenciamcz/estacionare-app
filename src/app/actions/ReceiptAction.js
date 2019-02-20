import firebase from 'react-native-firebase'
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import axios from 'axios'

import {clearTime} from './TimeActions'

export const saveState = (request) => {
    return {
        type: 'CHANGE_STATE',
        payload: request
    }
}

export const saveCity = (request) => {

    return {
        type: 'CHANGE_CITY',
        payload: request
    }
}

export const saveCar = (request) => {

    return {
        type: 'CHANGE_CAR',
        payload: request
    }
}

export const saveArea = (request) => {
    return {
        type: 'CHANGE_AREA',
        payload: request
    }
}

export const savePartner = (request) => {

    return {
        type: 'CHANGE_PARTNER',
        payload: request
    }
}

export const saveValue = (request) => {

    return {
        type: 'CHANGE_VALUE',
        payload: request
    }
}

export const saveTime = (request) => {

    return {
        type: 'CHANGE_TIME',
        payload: request
    }
}

export const changeStateFlag = () => {

    return {
        type: 'CHANGED_FLAG_STATUS',
        payload: true
    }
}


const formatDate = (data) => {
    const date = new Date(data)
    day = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()
    month = date.getDate() < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
    
    return `${day}/${month}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
}


export const saveAll = (item) => (dispatch) => {
    delete item.flagStatus 
    item = Object.assign(item, {type: "receipt" })



    AsyncStorage.getItem('CurrentUser').then((userId) => {
        firebase.database().ref('users/'+ userId + '/receipts/time').push({
            item
        }).then(() => {
            firebase.database().ref(`users/${userId}/credit`).once("value").then((snapshot) => {
                let val = parseFloat(item.value.replace('R$',''))
                let credit = parseFloat(snapshot._value) - val
                firebase.database().ref(`users/${userId}`).update({
                    credit
                }).then(() => {
                    dispatch(clearTime())


                    firebase.auth().onAuthStateChanged(function(user) {
                        const { city, car, area, time, value } = item
                        const { init, limit } = time
                        const sendMail = {
                            title: 'COMPROVANTE DE USO DE PARQUÍMETRO',
                            user: {
                                name : user._user.displayName ,
                                email: user._user.email 
                            },
                            items: [
                                { 
                                    label: 'Cidade',
                                    value:  city
                                },
                                { 
                                    label: 'Placa',
                                    value:  car
                                },
                                { 
                                    label: 'Setor',
                                    value:  area.name
                                },
                                { 
                                    label: 'De',
                                    value:  formatDate(init)
                                },
                                { 
                                    label: 'Até',
                                    value:  formatDate(limit)
                                },
                                { 
                                    label: 'Total',
                                    value:  value
                                }
                            ]
                        }        

                        axios.post('http://projetos.agenciazbra.com/estaciomobidashboard/mail/receipt', sendMail)
                             .then(function (response) {
                                console.log(response.data);
                             })
                             .catch(function (error) {
                                console.log(error);
                             });
                    })

                    

                }).then(() => {
                    dispatch(changeStateFlag())
                }).then(() => {
                    dispatch(
                        NavigationActions.navigate({
                            routeName: 'Home',
                        })
                    )
                })
            })

        }).catch((error) => {
            console.log(error)
        })

    })

}

