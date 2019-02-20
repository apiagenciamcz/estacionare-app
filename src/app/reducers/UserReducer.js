const INITIAL_STATE = { 
    user: {},
    fontSize: 1,
    cars: [],
    notifications: {},
    cards: [],
    receipts: [],
    visibleModalPassword: false,
    confirmePassword: '',
    userValidation: {},
    loading: false,
    cardEdit: {},
    operatorCardEdit: '',
    operatorCardkey: '',
    name: '',
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'GET_USER':
            return {
                ...state,
                user: action.payload,
            }
        case 'GET_NAME':
            return {
                ...state,
                name: action.payload,
            }
        case 'GET_CARS':
            return {
                ...state,
                cars: action.payload,
            }
        case 'GET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload,
            }
        case 'CHANGE_ITEM_NOTIFICATION':
            return {
                ...state,
                notifications: { ...state.notifications, [action.payload.item]: action.payload.val  },
            }
        case 'GET_CARDS':
            return {
                ...state,
                cards: action.payload,
            }
        case 'GET_CARDS':
            return {
                ...state,
                cards: action.payload,
            }
        case 'GET_RECEIPTS':
            return {
                ...state,
                receipts: action.payload,
            }
        case 'CHANGE_MODAL':
            return {
                ...state,
                visibleModalPassword: action.payload,
            }
        case 'CHANGE_PASSWORD_VALID':
            return {
                ...state,
                confirmePassword: action.payload,
            }
        case 'USER_VALIDATION':
            return {
                ...state,
                userValidation: action.payload,
            }
        case 'CHANGED_LOADING':
            return {
                ...state,
                loading: action.payload,
            }
        case 'GET_CARD_EDIT':
            return {
                ...state,
                cardEdit: action.payload,
            }
        case 'CHANGED_CARD':
            return {
                ...state,
                cardEdit: { ...state.cardEdit, num: action.payload } 
            }
        case 'SET_FLAG_CARD':
            return {
                ...state,
                cardEdit: { ...state.cardEdit, flag: action.payload } 
            }
        case 'CHANGED_DATE_CARD':
            return {
                ...state,
                cardEdit: { ...state.cardEdit, date: action.payload } 
            }
        case 'CHANGED_CVV_CARD':
            return {
                ...state,
                cardEdit: { ...state.cardEdit, cvv: action.payload } 
            }
        case 'CHANGED_NAME_CARD':
            return {
                ...state,
                cardEdit: { ...state.cardEdit, name: action.payload } 
            }
        case 'GET_FONT_SIZE':
            return {
                ...state,
                fontSize: action.payload 
            }
        case 'OPERATION_EDIT_CARD':
            return {
                ...state,
                operatorCardEdit: action.payload
            }
        case 'KEY_CARD_OPERATOR':
            return {
                ...state,
                operatorCardkey: action.payload
            }
        case 'GET_MAIN_CARD':
            return {
                ...state,
                mainCard: action.payload
            }
        default : 
            return state
    }
}