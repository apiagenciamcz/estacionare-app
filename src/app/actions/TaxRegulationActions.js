import axios from 'axios'
import firebase from 'react-native-firebase'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

export const modalVisibleCity = (oper) => {
    return {
        type: 'MODAL_VISIBLE_CITY',
        payload: oper
    }
}

export const readQRCode = (flag) => {
    return {
        type: 'MODAL_QRCODE',
        payload: flag
    }
}

export const setNumberQRCode = (number) => (dispatch) => {

    dispatch({
        type: 'CHANGED_NUMBER',
        payload: number
    })

    dispatch({
        type: 'MODAL_QRCODE',
        payload: false
    })

}


export const changeStateFlag = () => {

    return {
        type: 'CHANGED_FLAG_STATUS',
        payload: true
    }
}

export const init = () => (dispatch) => {
    let execute=true;
    dispatch(getCars())
    console.log("EXECUTOU")
    if(execute){
        execute = !execute;
    navigator.geolocation.getCurrentPosition(
        (position) => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDqK_G4WO7USQbA5n0mhvK-yR7DeUBO17w`)
            .then((response) => {
                let city = response.data.results[0].address_components[3].long_name
                let state = response.data.results[0].address_components[4].short_name
                dispatch({
                    type: 'CHANGE_LOCATION',
                    payload: { city, state }
                })
                console.log(response.data)
                dispatch(setCity(city))
                dispatch(getCitys(state))

            })
        },
        (error) => console.log(error),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    )
}
}

export const getCitys = (uf) => (dispatch) => {
    axios.get(`https://br-cidade-estado-nodejs.glitch.me/estados/${uf}/cidades`)
        .then((response) => {
            dispatch({
                type: 'GET_CITYS',
                payload: response.data
            })
        })
}

export const setCity = (city) => {
    return {
        type: 'SET_CITY',
        payload: city
    }
}

export const setCityLocation = (itemValue) => {

    return [
        modalVisibleCity('hidden'),
        {
            type: 'SET_CITY',
            payload: itemValue
        }
    ]
}

export const getCars = () => (dispatch) => {

    AsyncStorage.getItem('CurrentUser').then((userID) => {
        firebase.database().ref(`users/${userID}/cars`).once("value").then((snapshot) => {
            dispatch({
                type: 'GET_CARS',
                payload: snapshot._value
            })
        })
    })
}

export const saveCar = (car) => {
    return {
        type: 'SET_CAR',
        payload: car
    }
}

export const setText = (value,reducer) => {
    return {
        type: reducer,
        payload: value
    }
}
 
export const saveTaxRegulations = (alertNumber,city,car) => (dispatch) => {
    
    const receipt = {
        alertNumber,
        city,
        car,
        type: 'taxRegulation',
        area: 'Área Azul',
        date: new Date(),
        value: 2
    }   

    dispatch({
        type: 'GENERATE_RECEIPT',
        payload: receipt
    })

    dispatch(
        NavigationActions.navigate({
            routeName: 'ReceiptTax',
        })
    )
}

const formatDate = (data) => {
    const date = new Date(data)
    day = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate()
    month = date.getDate() < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
    
    return `${day}/${month}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
}

export const generateReceipt = (item) => (dispatch) => {
    dispatch(loading(true))
    
    setTimeout(() => {

        AsyncStorage.getItem('CurrentUser').then((userID) => {
            firebase.database().ref('users/'+userID+'/receipts/taxRegulation').push({
                item
            }).then(() => {

                firebase.database().ref(`users/${userID}/credit`).once("value").then((snapshot) => {
                    let credit = parseFloat(snapshot._value) - 2
                    firebase.database().ref(`users/${userID}`).update({
                        credit
                    }).then(() => {

                            firebase.auth().onAuthStateChanged(function(user) {
                                const { city, car, area, date, value, alertNumber } = item

                                const sendMail = {
                                    title: 'COMPROVANTE DE TAXA DE REGULARIZAÇÃO',
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
                                            value:  area
                                        },
                                        { 
                                            label: 'Número do Aviso',
                                            value:  alertNumber
                                        },
                                        { 
                                            label: 'Data',
                                            value:  formatDate(date)
                                        },
                                        { 
                                            label: 'Total',
                                            value:  `R$ ${value},00` 
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

                        })
                        .then(() => {
                            dispatch(changeStateFlag())
                        })
                        .then(() => {
                            dispatch(loading(false))
                            dispatch(
                                NavigationActions.navigate({
                                    routeName: 'Home',
                                })
                            )
                        }).catch((error) => {
                            console.log(error)
                        })
                    })
                })
            })
    },1000)
} 


export const loading = (flag) => {
    return {
        type: 'CHANGED_LOADING', 
        payload: flag
    }
}  