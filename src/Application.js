// React 
import React from 'react'

// Navigation 
import { createStackNavigator } from 'react-navigation'

// Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'

// Redux Middleware
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import timerMiddleware from 'redux-timer'
import { reduxifyNavigator, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers'

// Config Navigation 
import AppRouteConfigs from './Navigation'

// Config Reducer 
import { CombineReducer } from './Store'

// Merge React Native, Navigation and Redux
const AppNavigator = createStackNavigator(AppRouteConfigs)
const NavReducer   = createNavigationReducer(AppNavigator)
const appReducer   = combineReducers({ ...CombineReducer, nav: NavReducer })
const middleware   = createReactNavigationReduxMiddleware("root", state => state.nav );
const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => ({
    state: state.nav,
})
const AppWithNavigationState = connect(mapStateToProps)(App);
const store = createStore(appReducer, applyMiddleware(middleware, thunk, multi, promise, timerMiddleware));

// Init App  
class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        )
    }
}

export default Root