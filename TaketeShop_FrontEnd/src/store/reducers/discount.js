import {
  SET_DISCOUNT, GET_DISCOUNT,
  DELETE_DISCOUNT
} from "../actions/discount";
import DiscountModel from "../../models/discount/DiscountModel";
import { State } from "react-native-gesture-handler";

const initialState = {
  id: '0',
  categoryId: '0',
  voucher: '0',
  discountN: '0',
  membership: '0',
  endTime: '0',
  discounts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DISCOUNT: {
      return {...state, discounts: action.discounts }
    }
    case GET_DISCOUNT: {         
      return {        
        ...state,
        id: action.discounts.id,
        categoryId: action.discounts.categoryId,
        voucher: action.discounts.voucher,
        discountN: action.discounts.discount,
        membership: action.discounts.membership,
        endTime: action.discounts.endTime,
      };
    }
    case DELETE_DISCOUNT: {
      return {
        ...state,
        discounts: state.discounts.filter((ID) => ID.id !== action.discounts),
      }
    }
    default:
      return state;
  }
};