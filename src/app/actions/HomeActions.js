import { AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'

import { changeStateFlag } from './MoneyActions'

let timer = null

export const changeFlag = () => {

    return {
        type: 'CHANGED_FLAG_STATUS',
        payload: false
    }
}

export const counteTime = (limitDate) => (dispatch) => {
    let countDownDate = new Date(limitDate).getTime()

    dispatch(limitTime(limitDate))

    timer = setInterval(() => {
        dispatch(countTime(countDownDate))
    }, 1000)

}

export const clearHome = () => {
    clearInterval(timer)
    return [
        {
            type: 'CURRENT_TIME',
            payload: "--:--:--"
        }
    ]
}

export const countTime = (countDownDate) => {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    let time = hours + ":" + minutes + ":" + seconds
    
    if (distance < 0) {
        flag = false
        clearInterval(timer)
        return[
            isTime(flag),
            {
                type: 'CURRENT_TIME',
                payload: "--:--:--"
            }
        ]
    }
    
    flag = true
    return[
        isTime(flag),
        {
            type: 'CURRENT_TIME',
            payload: time
        }
    ]

}

export const getReceipt = () => (dispatch) => {
    AsyncStorage.getItem('CurrentUser').then((userID) => {
        firebase.database().ref(`users/${userID}/receipts/time`).limitToLast(1).once("value").then((snapshot) => {
            snapshot.forEach(item => {
                dispatch(updateReceipt({...item._value.item, key: item.key}))
            });
        })
    })
    dispatch(getCredit())
}

export const limitTime = (countDownDate) => {

    let distance = new Date(countDownDate).getTime() - new Date().getTime();
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let final = ((hours * 60) + minutes) / 60;
    final = final.toFixed(2)
    final = .25 * (Math.floor((2 - final) / 0.25))
    
    return {
        type: 'TIME_LIMITE',
        payload: final
    }

}

export const updateReceipt = (receipt) => {
    return [
        counteTime(receipt.time.limit),
        {
            type: 'GET_CURRENT_RECEIPT',
            payload: receipt
        }
    ]
}

export const clearReceipt = () => {
    clearInterval(timer)
    return [
        clearTime(),
        {
            type: 'GET_CURRENT_RECEIPT',
            payload: ''
        }
    ]
}

export const clearTime = () => {
    clearInterval(timer)
    return {
        type: 'CURRENT_TIME',
        payload: '--:--:--'
    }
}

export const isTime = (flag) => {
    return {
        type: 'IS_TIME',
        payload: flag
    }
}

export const getCredit = () => (dispatch) => {
    AsyncStorage.getItem('CurrentUser').then((userID) => {
        firebase.database().ref(`users/${userID}`).once("value").then((snapshot) => {
            dispatch({
                type: 'GET_CREDIT',
                payload: `R$ ${snapshot.val().credit ? snapshot.val().credit : '00'}`
            })
        }).then(() => {
            dispatch(changeStateFlag(false))
        })
    })
}