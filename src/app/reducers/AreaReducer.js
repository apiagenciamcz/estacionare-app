const INITIAL_STATE = { 
    partners : {}
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'GET_AREAS':
            return {
                ...state,
                partners: action.payload,
            }
        default : 
            return state
    }
}