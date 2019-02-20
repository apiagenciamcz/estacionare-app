const INITIAL_STATE = { 
    state: '',
    city: '',
    allStates: [],
    allCitys: [],
    modalCity: true,
    visibleState: 'hidden',
    visibleCity: 'hidden'
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'MODAL_VISIBLE_STATE':
            return {
                ...state,
                visibleState: action.payload,
            }
        case 'MODAL_VISIBLE_CITY':
            return {
                ...state,
                visibleCity: action.payload,
            }
        case 'GET_STATES':
            return {
                ...state,
                allStates: action.payload.data,
            }
        case 'CHANGE_STATE':
            return {
                ...state,
                state: action.payload,
            }
        case 'GET_CITYS':
            return {
                ...state,
                allCitys: action.payload.data,
            }
        case 'CHANGE_CITY':
            return {
                ...state,
                city: action.payload,
            }
        case 'ENABLE_MODAL_CITY':
            return {
                ...state,
                modalCity: action.payload,
            }
        default : 
            return state
    }
}