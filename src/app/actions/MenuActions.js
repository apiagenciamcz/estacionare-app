import { NavigationActions } from 'react-navigation'
import { clearHome, getReceipt } from './HomeActions'

export const toggleMenu = (flag) => {
    return {
        type: 'CHANGED_MENU',
        payload: flag
    }
}

export const changeScreen = (screen) =>  {
    return [
        toggleMenu(false),
        navegation(screen)
    ]
}

export const navegation = (screen) => (dispatch) =>  {
    dispatch(clearHome())
    dispatch(
        NavigationActions.navigate({
            routeName: screen,
        })
    )
    if(screen == 'Home'){
        setTimeout(() => {
            dispatch(getReceipt())
        }, 1000);
    }
}