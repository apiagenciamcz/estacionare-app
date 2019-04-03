const INITIAL_STATE = {
  licencePlates: [
    {
      "0": {
        name: "xxx-9999"
      }
    }
  ],
  location: {},
  allCitys: [
    {
      cidade: "----"
    }
  ],
  modalCity: true,
  city: "",
  visibleCity: "hidden",
  car: "",
  alertNumber: "",
  receipt: {},
  loading: false,
  modalQRcode: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "MODAL_VISIBLE_CITY":
      return {
        ...state,
        visibleCity: action.payload
      };
    case "CHANGE_LOCATION":
      return {
        ...state,
        location: action.payload
      };
    case "GET_CITYS":
      return {
        ...state,
        allCitys: action.payload
      };
    case "SET_CITY":
      return {
        ...state,
        city: action.payload
      };
    case "GET_CARS":
      return {
        ...state,
        licencePlates: action.payload
      };
    case "SET_CAR":
      return {
        ...state,
        car: action.payload
      };
    case "CHANGED_NUMBER":
      return {
        ...state,
        alertNumber: action.payload
      };
    case "GENERATE_RECEIPT":
      return {
        ...state,
        receipt: action.payload
      };
    case "MODAL_QRCODE":
      return {
        ...state,
        modalQRcode: action.payload
      };
    default:
      return state;
  }
}
