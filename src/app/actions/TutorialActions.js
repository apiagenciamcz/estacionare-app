import { Animated } from 'react-native'
import { NavigationActions } from 'react-navigation'

export const tutorialInit = (value, current) => (dispatch, getState) => {
    let listTutorial = getState().tutorial.styleOpacity
    let next

    if(current == 'one'){
        next = 'two'
    } else if(current == 'two'){
        next = 'three'
    } else if(current == 'three'){
        next = 'four'
    } else if(current == 'four'){
        next = 'five'
    } else if(current == 'five'){
        next = 'six'
    } else if(current == 'six'){
        next = 'seven'
    } else if(current == 'seven'){
        dispatch(
            NavigationActions.navigate({
                routeName: 'Home',
            })
        )
    }

    if(current != 'seven'){

        Object.keys(listTutorial).map((key) => {
            if(key != current){
                Animated.timing(listTutorial[key], {
                        toValue: 0,                   
                    }
                ).start();             
            }
        })    

        Animated.timing(value, {
                toValue: 1,                   
                duration: 200,             
            }
        ).start();    

        dispatch({
            type: 'CHANGE_TUTORIAL',
            payload: next
        })

    }else{

        dispatch({
            type: 'CHANGE_TUTORIAL',
            payload: 'one'
        })

    }

}

