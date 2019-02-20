import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'
import { saveTime, saveValue, saveState, saveCity,  saveCar, saveArea  } from './ReceiptAction'
import { Alert } from 'react-native'

export const init = (value, countTimer) => (dispatch) => {

    dispatch(countTime(countTimer))
    dispatch(initialValue(parseFloat(Number(value))/2))
    dispatch(updateValue(value))
    dispatch(finalValue(value))
    dispatch(updateFinalHour(0.50))
}

export const countTime = (countDownDate) => {

    if(countDownDate){
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

    } else{
        return {
            type: 'TIME_LIMITE',
            payload: 2
        }
    }
}

export const initialValue = (value) => {
    return {
        type: 'INITIAL_VALUE',
        payload: value
    }
}

export const updateValue = (value) => {
    return [
        finalValue(value),
        {
            type: 'CHANGE_VALUE',
            payload: value
        }
    ]
}  

export const finalValue = (value) => {
    return {
        type: 'FINAL_VALUE',
        payload: formatValue(value)
    }
}

export const updateTime = (time) => {
    return {
        type: 'CHANGE_NUMBER',
        payload: time
    }

}

export const updateDisableFirst = () => {
    return {
        type: 'DISABLE_FIRST',
        payload: true
    }
}

export const updateFinalHour = (time) => {
    return {
        type: 'CHANGE_FINAL_HOUR',
        payload: timeConvert(time)
    }

}   

export const number = (operator, time, initialValue, currentValue, flag) => {
    let number = Number(time)
    let baseCount = 0.25
    let value  = Number(initialValue)

    if(operator == '-'){

        number = number - baseCount
        newValue = Number(currentValue) - value

        return[
            updateTime(number),
            updateValue(newValue),
            updateFinalHour(number)
        ]
        
    }else{

        number = number + baseCount
        newValue = Number(currentValue) + value

        return[
            updateDisableFirst(true),
            updateTime(number),
            updateValue(newValue),
            updateFinalHour(number)
        ]

    }
}

export const save = (time, value) => {
    const hrs = parseInt(Number(time))
    const min = parseInt((Number(time)-hrs) * 60)
    const currentDate = new Date()
    const limitDate = new Date()
    limitDate.setHours(currentDate.getHours() + hrs, currentDate.getMinutes() + min)

    return [
        {
            type: 'DISABLE_FIRST',
            payload: false
        },
        saveValue(value),
        saveTime({ init: currentDate, limit: limitDate }),
        navigation()
    ]
}

export const update =  (time, value) => (dispatch,getState) => {
    const receipt = getState().home.receipt
    const hrs = parseInt(Number(time))
    const min = parseInt((Number(time)-hrs) * 60)
    
    AsyncStorage.getItem('CurrentUser').then((userID) => {
        firebase.database().ref(`users/${userID}/receipts/time/${receipt.key}/`).once("value")
            .then((snapshot) => {
                const itemReceipt = snapshot._value.item
                let currentDate = new Date(itemReceipt.time.limit)
                currentDate.setHours(currentDate.getHours() + hrs, currentDate.getMinutes() + min)
                let timeUp = { init: itemReceipt.time.init, limit: currentDate }
                dispatch(saveState(itemReceipt.state))
                dispatch(saveCity(itemReceipt.city))
                dispatch(saveCar(itemReceipt.car))
                dispatch(saveArea(itemReceipt.area))
                dispatch(saveTime(timeUp))
                dispatch(saveValue(formatValue(value)))
                dispatch(clearTime())
                dispatch(navigation())
        
            })
                    
    })

}

export const navigation = () => (dispatch) => {
    dispatch(
        NavigationActions.navigate({
            routeName: 'Receipt',
        })
    )
}
 
const timeConvert = (info) => {
    var hrs = parseInt(Number(info))
    var min = parseInt((Number(info)-hrs) * 60)


    if(min < 10){
        if(min == 1){
            min = '00'
        }else{
            min = '0'+min
        }
    }

    return `${ (`${hrs}:${min}`).slice(0,4) } h`
    
}

export const clearTime = () => {
    return{
        type: 'RESET_TIME',
    }
}
 
const formatValue = (value) => {
    const val = value.toString().slice(0,4).split(".")

    if(Number(val[1]) < 10){
        val[1] = val[1] + '0'
    }

    return `R$ ${val[0]},${val[1]}`
}