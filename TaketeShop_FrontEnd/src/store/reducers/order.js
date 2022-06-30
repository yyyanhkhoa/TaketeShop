import {
  GET_ALL_ORDER,
  REMOVE_CONFIRMED_ORDERS,
  REMOVE_DELIVERED_ORDERS,
  REMOVE_DELIVERING_ORDERS,
  REMOVE_WAITING_ORDERS,
  SET_CANCEL_ORDERS,
  SET_CONFIRMED_ORDERS,
  SET_CURRENT_ORDER,
  SET_CURRENT_ORDER_ITEMS,
  SET_DELIVERED_ORDERS,
  SET_DELIVERING_ORDERS,
  SET_WAITING_ORDERS,
  UPDATE_CANCEL_ORDERS,
} from '../actions/order';

const initialState = {
  waitingOrders: [],
  confirmedOrders: [],
  deliveringOrders: [],
  deliveredOrders: [],
  cancelOrders: [],
  allOrders: [],
  currentOrder: {
    orderID: 0,
    userID: 0,
    name: 'Không xác định',
    gender: 'Không xác định',
    phone: 0,
    province: 'Không xác định',
    district: 'Không xác định',
    ward: 'Không xác định',
    street: 'Không xác định',
    quantity: 9999,
    totalCost: 9999,
    status: 'Không xác định',
    payment: 0,
    paid: 0,
    createTime: 'Không xác định',
    updateTime: 'Không xác định',
  },
  currentOrderItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: action.order,
      };
    }
    case SET_CURRENT_ORDER_ITEMS: {
      return {
        ...state,
        currentOrderItems: action.orderItems,
      };
    }
    case SET_WAITING_ORDERS: {
      return {
        ...state,
        waitingOrders: action.orderItems,
      };
    }
    case SET_CONFIRMED_ORDERS: {
      return {
        ...state,
        confirmedOrders: action.orderItems,
      };
    }
    case SET_DELIVERING_ORDERS: {
      return {
        ...state,
        deliveringOrders: action.orderItems,
      };
    }
    case SET_DELIVERED_ORDERS: {
      return {
        ...state,
        deliveredOrders: action.orderItems,
      };
    }
    case SET_CANCEL_ORDERS: {
      return {
        ...state,
        cancelOrders: action.orderItems,
      };
    }
    case GET_ALL_ORDER: {
      return {
        ...state,
        allOrders: action.orderItems,
      };
    }
    case REMOVE_WAITING_ORDERS: {
      console.log(action.orderID);
      return {
        ...state,
        waitingOrders: state.waitingOrders.filter(
          item => item.orderID != action.orderID,
        ),
      };
    }
    case REMOVE_CONFIRMED_ORDERS: {
      console.log(action.orderID);
      return {
        ...state,
        confirmedOrders: state.confirmedOrders.filter(
          item => item.orderID != action.orderID,
        ),
      };
    }
    case REMOVE_DELIVERING_ORDERS: {
      console.log(action.orderID);
      return {
        ...state,
        deliveringOrders: state.deliveringOrders.filter(
          item => item.orderID != action.orderID,
        ),
      };
    }
    case REMOVE_DELIVERED_ORDERS: {
      console.log(action.orderID);
      return {
        ...state,
        deliveredOrders: state.deliveredOrders.filter(
          item => item.orderID != action.orderID,
        ),
      };
    }
    default:
      return state;
  }
};
// export const GET_ALL_ORDER = 'GET_ALL_ORDER';
// export const UPDATE_ORDER = 'UPDATE_ORDER';
// export const SET_WAITING_ORDERS = 'SET_WAITING_ORDERS';
// export const SET_CONFIRMED_ORDERS = 'SET_CONFIRMED_ORDERS';
// export const SET_DELIVERING_ORDERS = 'SET_DELIVERING_ORDERS';
// export const SET_DELIVERED_ORDERS = 'SET_DELIVERED_ORDERS';
// export const SET_CANCEL_ORDERS = 'SET_CANCEL_ORDERS';
// export const CONFIRM_ORDERS = 'CONFIRM_ORDERS';
// export const DELIVERING_ORDERS = 'DELIVERING_ORDERS';
// export const DELIVERED_ORDERS = 'DELIVERED_ORDERS';
// export const CANCEL_ORDERS = 'CANCEL_ORDERS';
// export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
// export const SET_CURRENT_ORDER_ITEMS = 'SET_CURRENT_ORDER';
