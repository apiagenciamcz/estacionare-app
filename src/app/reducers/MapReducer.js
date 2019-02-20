import { Animated } from 'react-native'

const INITIAL_STATE = { 
    location: { 
        latitude: 0,
        longitude: 0,
    },
    currentUser: { 
        latitude: 0,
        longitude: 0,
    },
    searchDestiny: null, 
    inputSearch: '',
    dragMap: true, 
    sensors: [],
    centers: [],
    coords: null,
    degree: null,
    destination: '',
    areas: [],
    followUserLocation: true,
    levelZoom: 14,
    search: '',
    listLocations: {},
    iconSearch: 'search',  
    flagSearch: true,
    widthAnim: new Animated.Value(0),  
}

export default function( state = INITIAL_STATE, action ) {
    switch(action.type){
        case 'LOCATION_USER':
            return {
                ...state,
                location: action.payload
            }
        case 'LOCATION_CURRENT':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'DELTA_USER':
            return {
                ...state,
                delta: action.payload
            }
        case 'CHANGED_TEXT': 
            return {
                ...state,
                inputSearch: action.payload
            }
        case 'GET_SENSORS': 
            return {
                ...state,
                sensors: action.payload
            }
        case 'SET_DIRECTION': 
            return {
                ...state,
                coords: action.payload
            }
        case 'GET_AREAS': 
            return {
                ...state,
                areas: action.payload
            }
        case 'SET_DESTINATION': 
            return {
                ...state,
                destination: action.payload
            }
        case 'LEVEL_ZOOM': 
            return {
                ...state,
                levelZoom: action.payload
            }
        case 'GET_CENTERS': 
            return {
                ...state,
                centers: action.payload
            }
        case 'CHANGE_SEARCH': 
            return {
                ...state,
                search: action.payload
            }
        case 'CHANGE_LIST_LOCATIONS': 
            return {
                ...state,
                listLocations: action.payload
            }
        case 'ICON_SEARCH': 
            return {
                ...state,
                iconSearch: action.payload
            }
        case 'FLAG_BUTTON_SEARCH': 
            return {
                ...state,
                flagSearch: action.payload
            }
        case 'CHANGE_DESTINY_LOCATIONS': 
            return {
                ...state,
                searchDestiny: action.payload
            }
        case 'GET_ROTATE': 
            return {
                ...state,
                degree: action.payload
            }
        case 'DRAG': 
            return {
                ...state,
                dragMap: action.payload
            }
        default : 
            return state
    }
}