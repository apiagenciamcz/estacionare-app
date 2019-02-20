const INITIAL_STATE = { 
    allCars: {}
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'GET_CARS':
            return {
                ...state,
                allCars: action.payload._value,
            }
        default : 
            return state
    }
}