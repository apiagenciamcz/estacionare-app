const INITIAL_STATE = { 
    value: '', 
    time: 0.50, 
    initialValue: '', 
    finalHour: '',
    finalValue: '',
    limitTime: 0,
    disableFirst: false
} 

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'CHANGE_NUMBER':
            return {
                ...state,
                time: action.payload,
            }
        case 'CHANGE_VALUE':
            return {
                ...state,
                value: action.payload,
            }
        case 'CHANGE_FINAL_HOUR':
            return {
                ...state,
                finalHour: action.payload,
            }
        case 'INITIAL_VALUE':
            return {
                ...state,
                initialValue: action.payload,
            }
        case 'FINAL_VALUE':
            return {
                ...state,
                finalValue: action.payload,
            }
        case 'TIME_LIMITE':
            return {
                ...state,
                limitTime: action.payload,
            }
        case 'DISABLE_FIRST':
            return {
                ...state,
                disableFirst: action.payload,
            }
        case 'RESET_TIME':
            return INITIAL_STATE
        default : 
            return state
    }
}