import React from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import Menu from '../components/template/menu'

import MapHome  from "./map"
import Profile  from "./profile"
import Notifications  from "./notifications"
import Payment  from "./payment"
import ListReceipts  from "./receipts/listReceipts"
import TermsUse  from "./termsUse"
import Tutorial  from "./tutorial"

import FontAwesome, { Icons } from 'react-native-fontawesome'

const Drawer = new createDrawerNavigator({
    MapHome: { 
        screen: MapHome,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    Profile: { 
        screen: Profile,
        navigationOptions: {
            drawerIcon: () => (<FontAwesome style={{ fontSize:16, color:'#6E6E6E' }}>{Icons.user}</FontAwesome>),
        }
    },
    Notifications: { 
        screen: Notifications,
        navigationOptions: {
            drawerIcon: () => (<FontAwesome style={{ fontSize:16, color:'#6E6E6E' }}>{Icons.bell}</FontAwesome>),
        }
    },
    Payment: { 
        screen: Payment,
        navigationOptions: {
            drawerIcon: () => (<FontAwesome style={{ fontSize:16, color:'#6E6E6E' }}>{Icons.creditCardAlt}</FontAwesome>),
        }
    },
    ListReceipts: { 
        screen: ListReceipts,
        navigationOptions: {
            drawerIcon: () => (<FontAwesome style={{ fontSize:16, color:'#6E6E6E' }}>{Icons.money}</FontAwesome>),
        }
    },
    Tutorial: { 
        screen: Tutorial,
        navigationOptions: {
            drawerIcon: () => (<FontAwesome style={{ fontSize:20, color:'#6E6E6E' }}>{Icons.objectGroup}</FontAwesome>),
        }
    },
    TermsUse: { 
        screen: TermsUse,
        navigationOptions: {
            drawerIcon: () => (<FontAwesome style={{ fontSize:16, color:'#6E6E6E' }}>{Icons.checkSquare}</FontAwesome>),
        }
    },
},
{
    initialRouteName:'MapHome',
    navigationOptions: {
        headerMode: 'none',
        gesturesEnabled: false,
    },
    contentOptions: {
        activeBackgroundColor: '#ffffff',
        labelStyle:{
            fontSize:15,
            color:'#6E6E6E',
            fontWeight: '300'
        }
    },
    drawerPosition: 'right',
    contentComponent: (props) => <Menu><DrawerItems {...props} /></Menu>, 
});

export default Drawer