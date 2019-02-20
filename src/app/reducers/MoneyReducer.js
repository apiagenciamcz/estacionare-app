const INITIAL_STATE = { 
    current: 14.00,
    cards: [],
    receipt: {},
    total: null,
    flagStatus: false,
    outherValue: null
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'CHANGED_CURRENT':
            return {
                ...state,
                current: action.payload,
            }
        case 'GET_CARDS':
            return {
                ...state,
                cards: action.payload,
            }
        case 'MODAL_VISIBLE_CARDS':
            return {
                ...state,
                visibleCards: action.payload,
            }
        case 'GENERATE_RECEIPT':
            return {
                ...state,
                receipt: action.payload,
            }
        case 'SAVE_CREDIT':
            return {
                ...state,
                total: action.payload,
            }
        case 'STATUS_CREDIT':
            return {
                ...state,
                flagStatus: action.payload,
            }
        default : 
            return state
    }
}