
// Init App
import Loader   from './app/screens/loader'
import Welcome   from './app/screens/welcome'
import Login     from './app/screens/login'
import TermsUse  from './app/screens/termsUse'

// Register Acount
import RegisterStepOne          from './app/screens/registers/registerStepOne'
import RegisterAcceptTermsUse   from './app/screens/registers/registerAcceptTermsUse'
import RegisterStepTwo          from './app/screens/registers/registerStepTwo'
import RegisterStepThree        from './app/screens/registers/registerStepThree'
import RegisterStepFour        from './app/screens/registers/registerStepFour'

// Confirm Success Acount
import Confirm from './app/screens/confirm'

import Tutorial   from "./app/screens/tutorial"

// Paymente 
import PayStepOne   from "./app/screens/pay/payStepOne"
import PayStepTwo   from "./app/screens/pay/payStepTwo"
import PayStepThree from "./app/screens/pay/payStepThree"
import PayStepFour  from "./app/screens/pay/payStepFour"
import EditCard     from "./app/screens/editCard"

// Receipts 
import Receipt  from "./app/screens/receipt"
import ReceiptCredit  from "./app/screens/receiptCredit"
import ReceiptTax  from "./app/screens/receiptTax"

import ListReceipts       from "./app/screens/receipts/listReceipts"
import ItemReceipts       from "./app/screens/receipts/itemReceipts"

// Basic Screens 
import Profile            from "./app/screens/profile"
import Notifications      from "./app/screens/notifications"
import Payment            from "./app/screens/payment"
import TaxRegulation      from "./app/screens/taxRegulation"
import AddCredit          from "./app/screens/addCredit"
import DrawerHome         from './app/screens/drawer'
import DrawerMap          from './app/screens/drawerMap'

const AppRouteConfigs = {
    Loader:                   { screen: Loader, navigationOptions:{ header: null}},
    Welcome:                  { screen: Welcome },
    Login:                    { screen: Login },
    RegisterStepOne:          { screen: RegisterStepOne },
    RegisterStepTwo:          { screen: RegisterStepTwo },
    RegisterStepFour:         { screen: RegisterStepFour },
    RegisterAcceptTermsUse:   { screen: RegisterAcceptTermsUse },
    RegisterStepThree:        { screen: RegisterStepThree },
    TermsUse:                 { screen: TermsUse },
    Confirm:                  { screen: Confirm },
    Tutorial:                 { screen: Tutorial },
    PayStepOne:               { screen: PayStepOne },
    PayStepTwo:               { screen: PayStepTwo },
    PayStepThree:             { screen: PayStepThree },
    PayStepFour:              { screen: PayStepFour },
    Receipt:                  { screen: Receipt },
    ReceiptCredit:            { screen: ReceiptCredit },
    ReceiptTax:               { screen: ReceiptTax },
    Home:                     { screen: DrawerHome, navigationOptions:{ header: null,  gesturesEnabled: false }},
    Profile:                  { screen: Profile },
    Notifications:            { screen: Notifications },
    Payment:                  { screen: Payment },
    ListReceipts:             { screen: ListReceipts },
    ItemReceipts:             { screen: ItemReceipts },
    AddCredit:                { screen: AddCredit },
    MapHome:                  { screen: DrawerMap, navigationOptions:{ header: null,  gesturesEnabled: false } },
    TaxRegulation:            { screen: TaxRegulation },
    EditCard:                 { screen: EditCard },
}

export default AppRouteConfigs
