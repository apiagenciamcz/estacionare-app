
const INITIAL_STATE = { 
    email: '', 
    password: '', 
    confirmePassword: '', 
    loading: false,
    name: '',
    cpf: '',
    cars: [{ name: '', value: '' }], 
    disableAddCar: false,
    totalCars: 1,  
    pcd: {
        status: false,
        number: ''
    },
    oldMan: {
        status: false,
        number: ''
    },
    cards: { 
        num: '',
        date: '',
        flag: '',
        cvv: '',
        name: '' 
    },
    typeAccount: "Free"
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'CHANGED_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        case 'CHANGED_PASSWORD':
            return {
                ...state,
                password: action.payload
            }
        case 'CHANGED_CONFIRME_PASSWORD':
            return {
                ...state,
                confirmePassword: action.payload
            }
        case 'CHANGED_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'CHANGED_PCD':
            return {
                ...state,
                pcd: { ...state.pcd, status: action.payload }
            }
        case 'CHANGED_NUM_PCD':
            return {
                ...state,
                oldMan: { ...state.oldMan, number: action.payload }
            }
        case 'CHANGED_OLD_MAN':
            return {
                ...state,
                oldMan: { ...state.oldMan, status: action.payload }
            }
        case 'CHANGED_NUM_OLD_MAN':
            return {
                ...state,
                pcd: { ...state.pcd, number: action.payload }
            }
        case 'CHANGED_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'CHANGE_CARS':
            return {
                ...state,
                cars: action.payload
            }
        case 'DISABLING_ADD_CAR':
            return {
                ...state,
                disableAddCar: action.payload
            }
        case 'CHANGE_TOTAL_CARS':
            return {
                ...state,
                totalCars: action.payload
            }
        case 'CHANGED_CARD':
            return {
                ...state,
                cards: { ...state.cards, num: action.payload } 
            }
        case 'SET_FLAG_CARD':
            return {
                ...state,
                cards: { ...state.cards, flag: action.payload } 
            }
        case 'CHANGED_DATE_CARD':
            return {
                ...state,
                cards: { ...state.cards, date: action.payload } 
            }
        case 'CHANGED_CVV_CARD':
            return {
                ...state,
                cards: { ...state.cards, cvv: action.payload } 
            }
        case 'CHANGED_NAME_CARD':
            return {
                ...state,
                cards: { ...state.cards, name: action.payload } 
            }
        case 'CHANGED_TYPE_ACCOUNT':
            return {
                ...state,
                typeAccount: action.payload 
            }
        case 'CHANGE_CPF':
            return {
                ...state,
                cpf: action.payload 
            }
        default : 
            return state
    }
}