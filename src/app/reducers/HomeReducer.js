const INITIAL_STATE = { count: "--:--:--", receipt: '', credit: 'R$ 00,00', limitTime: 2, isTime: false, disableFirst: false } 

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'CURRENT_TIME':
            return {
                ...state,
                count: action.payload,
            }
        case 'GET_CURRENT_RECEIPT':
            return {
                ...state,
                receipt: action.payload,
            }
        case 'GET_CREDIT':
            return {
                ...state,
                credit: action.payload,
            }
        case 'TIME_LIMITE':
            return {
                ...state,
                limitTime: action.payload,
            }
        case 'IS_TIME':
            return {
                ...state,
                isTime: action.payload,
            }
        case 'CLEAR_HOME':
            return INITIAL_STATE
        default : 
            return state
    }
}