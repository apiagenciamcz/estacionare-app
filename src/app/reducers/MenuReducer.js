const INITIAL_STATE = { 
    status: false
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'CHANGED_MENU':
            return {
                ...state,
                status: action.payload,
            }
        default : 
            return state
    }
}