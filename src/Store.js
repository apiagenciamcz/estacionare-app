
import AreaReducer from "./app/reducers/AreaReducer"
import LocationReducer from "./app/reducers/LocationReducer"
import ReceiptReducer from "./app/reducers/ReceiptReducer"
import CarReducer from "./app/reducers/CarReducer"
import TimeReducer from "./app/reducers/TimeReducer"
import HomeReducer from "./app/reducers/HomeReducer"
import UserReducer from "./app/reducers/UserReducer"
import MoneyReducer from "./app/reducers/MoneyReducer"
import MenuReducer from "./app/reducers/MenuReducer"
import MapReducer from "./app/reducers/MapReducer"
import LoginReducer from "./app/reducers/LoginReducer"
import RegisterReducer from "./app/reducers/RegisterReducer"
import TaxRegulationReducer from "./app/reducers/TaxRegulationReducer"
import TutorialReducer from "./app/reducers/TutorialReducer"

export const CombineReducer = {
    area: AreaReducer,
    location: LocationReducer,
    receipt: ReceiptReducer,
    car: CarReducer,
    time: TimeReducer,
    home: HomeReducer,
    user: UserReducer,
    money: MoneyReducer,
    menu: MenuReducer,
    map: MapReducer,
    login: LoginReducer,
    register: RegisterReducer,
    taxRegulation: TaxRegulationReducer,
    tutorial: TutorialReducer,
}