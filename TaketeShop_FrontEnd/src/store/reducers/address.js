import {DELETE_ADDRESS, SELECT_ADDRESS, SET_ADDRESS, SET_DISTRICTS, SET_PROVINCES, SET_WARDS} from '../actions/address';

const initialState = {
  addresses: [],
  provinces: [],
  districts: [],
  wards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS: {
      return {
        ...state,
        addresses: action.addresses,
      };
    }
    case DELETE_ADDRESS: {
      const index = state.addresses.findIndex(item => item.addressID == action.id);
      let remainAddresses;
      if (state.addresses[index].isSelected){
        remainAddresses = [...state.addresses.filter(item => item.addressID !== action.id)];
        if (remainAddresses.length) remainAddresses[0].isSelected = true;
      } else {
        remainAddresses = [...state.addresses.filter(item => item.addressID !== action.id)];
      }
      return {
        ...state,
        addresses: remainAddresses,
      };
    }
    case SELECT_ADDRESS: {
      return {
        ...state,
        addresses: [
          ...state.addresses.map(item => {
            if (item.addressID === action.id)
              return {...item, isSelected: true};
            return {...item, isSelected: false};
          }),
        ],
      };
    }
    case SET_PROVINCES: {
      return {
        ...state,
        provinces: action.provinces,
      };
    }
    case SET_DISTRICTS: {
      return {
        ...state,
        districts: action.districts,
      };
    }
    case SET_WARDS: {
      return {
        ...state,
        wards: action.wards,
      };
    }
    default: {
      return state;
    }
  }
};
