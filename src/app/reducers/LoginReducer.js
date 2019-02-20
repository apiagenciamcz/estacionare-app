
const INITIAL_STATE = { email: '', password: '', loading: false }

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
        case 'CHANGED_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default : 
            return state
    }
}