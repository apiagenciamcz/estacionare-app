const INITIAL_STATE = { 
    state: '',
    city: '',
    car: '',
    area: {},
    value: '',
    partner: '',
    time: { limit: '', init: ''},
    flagStatus: false
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'CHANGE_STATE':
            return {
                ...state,
                state: action.payload,
            }
        case 'CHANGE_CITY':
            return {
                ...state,
                city: action.payload,
            }
        case 'CHANGE_CAR':
            return {
                ...state,
                car: action.payload,
            }
        case 'CHANGE_AREA':
            return {
                ...state,
                area: action.payload,
            }
        case 'CHANGE_PARTNER':
            return {
                ...state,
                partner: action.payload,
            }
        case 'CHANGE_VALUE':
            return {
                ...state,
                value: action.payload,
            }
        case 'CHANGE_TIME':
            return {
                ...state,
                time: action.payload,
            }
        case 'CHANGED_FLAG_STATUS':
            return {
                ...state,
                flagStatus: action.payload,
            }
        default : 
            return state
    }
}