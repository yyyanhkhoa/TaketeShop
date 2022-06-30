import {
  ADD_CART,
  CHECK_ALL_CART_ITEMS,
  DELETE_CART_ITEMS,
  PICK_ADDRESS,
  PICK_CART_ITEMS,
  SELECT_CART_ITEMS,
  SET_CART_ITEMS,
  UPDATE_CART_ITEMS,
} from '../actions/cart';

const initialState = {
  cartItems: [],
  cartDetail: {
    userID: null,
    items: [],
    address: {},
    quantity: +0,
    totalBill: +0,
  },
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_ITEMS: {
      return {
        ...state,
        cartItems: action.cartItems,
      };
    }
    case DELETE_CART_ITEMS: {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id != action.id),
      };
    }
    case SELECT_CART_ITEMS: {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map(item => {
            if (item.id === action.id)
              return {...item, isSelected: !item.isSelected};
            return item;
          }),
        ],
      };
    }
    case CHECK_ALL_CART_ITEMS: {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map(item => {
            return {...item, isSelected: action.flag};
          }),
        ],
      };
    }
    case UPDATE_CART_ITEMS: {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map(item => {
            if (item.id == action.id)
              return {...item, quantity: action.quantity};
            return item;
          }),
        ],
      };
    }
    case PICK_CART_ITEMS: {
      return {
        ...state,
        cartDetail: {
          ...state.cartDetail,
          items: action.items,
          quantity: action.quantity,
          totalBill: action.totalBill,
        },
      };
    }
    case PICK_ADDRESS: {
      return {
        ...state,
        cartDetail: {
          ...state.cartDetail,
          address: action.address,
          userID: action.userID
        },
      };
    }
    case ADD_CART: {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map(item => {
            if (item.id == action.id)
              return {...item, quantity: action.quantity + item.quantity};
            return item;
          }),
        ],
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
