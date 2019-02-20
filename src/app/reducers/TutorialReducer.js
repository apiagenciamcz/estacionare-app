import { Animated } from 'react-native'

const INITIAL_STATE = { 
    styleOpacity: {
        one: new Animated.Value(0),
        two: new Animated.Value(0),
        three: new Animated.Value(0),
        four: new Animated.Value(0),
        five: new Animated.Value(0),
        six: new Animated.Value(0),
    },
    nextTutorial: 'one'
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'CHANGE_TUTORIAL':
            return {
                ...state,
                nextTutorial: action.payload
            }
        default : 
            return state
    }
}