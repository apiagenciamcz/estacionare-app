import { saveArea, savePartner } from './ReceiptAction'
import { NavigationActions } from 'react-navigation'
import firebase from 'react-native-firebase'

export const setArea = (name, value, partner) => {
    return [
        {
            type: 'CHANGE_NUMBER',
            payload:  0.50
        },
        {
            type: 'DISABLE_FIRST',
            payload: false
        },
        saveArea({ name, value }),
        savePartner(partner),
        navigation()
    ]
}

export const getAreas = (state, city) => (dispatch) => {
    
    firebase.database().ref('partners').once("value").then((snapshot) => {
        let partners  = snapshot.val()
        let items = {}

        Object.keys(partners).map((item) => {
            if(partners[item].city == city && partners[item].state == state){
                items = { ...items,  [item]: partners[item] }
            }
        })

        dispatch({
            type: 'GET_AREAS',
            payload: items
        })

    })

}

export const navigation = () => {
    return dispatch => {
        dispatch(
            NavigationActions.navigate({
                routeName: 'PayStepFour',
            })
        )
    }
}