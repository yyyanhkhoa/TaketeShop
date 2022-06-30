import OrderItemsModel from "../../models/order/OrderItemsModel";
import OrderModel from "../../models/order/OrderModel";

export const GET_ALL_ORDER = 'GET_ALL_ORDER';
export const SET_WAITING_ORDERS = 'SET_WAITING_ORDERS';
export const SET_CONFIRMED_ORDERS = 'SET_CONFIRMED_ORDERS';
export const SET_DELIVERING_ORDERS = 'SET_DELIVERING_ORDERS';
export const SET_DELIVERED_ORDERS = 'SET_DELIVERED_ORDERS';
export const SET_CANCEL_ORDERS = 'SET_CANCEL_ORDERS';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const SET_CURRENT_ORDER_ITEMS = 'SET_CURRENT_ORDER_ITEMS';

export const REMOVE_WAITING_ORDERS = 'REMOVE_WAITING_ORDERS';
export const REMOVE_CONFIRMED_ORDERS = 'REMOVE_CONFIRMED_ORDERS';
export const REMOVE_DELIVERING_ORDERS = 'REMOVE_DELIVERING_ORDERS';
export const REMOVE_DELIVERED_ORDERS = 'REMOVE_DELIVERED_ORDERS';


const ORDER_STATUS = {
  WAITING: 1,
  CONFIRMED: 2,
  DELIVERING: 3,
  DELIVERED: 4,
  CANCEL: 5,
};



////////
export const fetchOrderWithOrderID = ({id, token}) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `http://localhost:5000/order/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
        },
      );
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();

      const order = new OrderModel({
        orderID: resData.id,
        userID: resData.user_id,
        name: resData.name,
        gender: resData.gender,
        phone: resData.phone,
        province: resData.province,
        district: resData.district,
        ward: resData.ward,
        street: resData.street,
        quantity: resData.quantity,
        totalCost: resData.totalCost,
        status: resData.status,
        payment: resData.payment,
        paid: resData.paid,
        createTime: resData.create_time,
        updateTime: resData.update_time,
      })
      dispatch({type: SET_CURRENT_ORDER, order: order});
    } catch (error) {
      console.log(error);
      throw error;
    }
};
}
export const fetchOrderItemsWithOrderID = ({id, token}) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `http://localhost:5000/order/item/order/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
        },
      );
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();
      const loadOrdersItems = [];

    for (const key in resData) {
      loadOrdersItems.push(
        new OrderItemsModel({
          orderItemsID: resData[key].id,
          orderID: resData[key].order_id,
          categoryID: resData[key].category_id,
          productID: resData[key].product_id,
          name: resData[key].name,
          price: resData[key].price,
          quantity: resData[key].quantity,
          discount: resData[key].discount,
          image: resData[key].image,
          createTime: resData[key].create_time,
          updateTime: resData[key].update_time,
        }),
      );
    }
      dispatch({type: SET_CURRENT_ORDER_ITEMS, orderItems: loadOrdersItems});
    } catch (error) {
      console.log(error);
      throw error;
    }
};
}
////////
////////Customer
export const fetchWaitingOrdersWithUserID = ({id, token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrders({
      id: id,
      token: token,
      status: ORDER_STATUS.WAITING,
      page: page,
    });
    dispatch({type: SET_WAITING_ORDERS, orderItems: loadOrders});
  };
};
export const fetchConfirmedOrdersWithUserID = ({id, token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrders({
      id: id,
      token: token,
      status: ORDER_STATUS.CONFIRMED,
      page: page,
    });
    dispatch({type: SET_CONFIRMED_ORDERS, orderItems: loadOrders});
  };
};
export const fetchDeliveringOrdersWithUserID = ({id, token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrders({
      id: id,
      token: token,
      status: ORDER_STATUS.DELIVERING,
      page: page,
    });
    dispatch({type: SET_DELIVERING_ORDERS, orderItems: loadOrders});
  };
};
export const fetchDeliveredOrdersWithUserID = ({id, token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrders({
      id: id,
      token: token,
      status: ORDER_STATUS.DELIVERED,
      page: page,
    });
    dispatch({type: SET_DELIVERED_ORDERS, orderItems: loadOrders});
  };
};
export const fetchCancelOrdersWithUserID = ({id, token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrders({
      id: id,
      token: token,
      status: ORDER_STATUS.CANCEL,
      page: page,
    });
    dispatch({type: SET_CANCEL_ORDERS, orderItems: loadOrders});
  };
};
/////////////// Update Status With Admin Roles
export const confirmOrdersWithOrderID = ({orderID, token}) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/order/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        status: ORDER_STATUS.CONFIRMED,
      }),
    }).then(dispatch({type: REMOVE_WAITING_ORDERS, orderID: orderID}));
    
  };
};
export const deliveryOrdersWithOrderID = ({orderID, token}) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/order/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        status: ORDER_STATUS.DELIVERING,
      }),
    }).then(dispatch({type: REMOVE_CONFIRMED_ORDERS, orderID: orderID}));
    
  };
};
export const deliveredOrdersWithOrderID = ({orderID, token}) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/order/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        status: ORDER_STATUS.DELIVERED,
      }),
    }).then(dispatch({type: REMOVE_DELIVERING_ORDERS, orderID: orderID}));
    
  };
};
/////////////// Cancel Status With Admin Roles
export const cancelWaitingOrdersWithOrderID = ({orderID, token}) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/order/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        status: ORDER_STATUS.CANCEL,
      }),
    }).then(dispatch({type: REMOVE_WAITING_ORDERS, orderID: orderID}));
    
  };
};
export const cancelConfirmOrdersWithOrderID = ({orderID, token}) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/order/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        status: ORDER_STATUS.CANCEL,
      }),
    }).then(dispatch({type: REMOVE_CONFIRMED_ORDERS, orderID: orderID}));
    
  };
};
export const cancelDeliveryOrdersWithOrderID = ({orderID, token}) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/order/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        status: ORDER_STATUS.CANCEL,
      }),
    }).then(dispatch({type: REMOVE_DELIVERING_ORDERS, orderID: orderID}));
    
  };
};
export const cancelDeliveredOrdersWithOrderID = ({orderID, token}) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/order/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        status: ORDER_STATUS.CANCEL,
      }),
    }).then(dispatch({type: REMOVE_DELIVERED_ORDERS, orderID: orderID}));
    
  };
};

///////////////


export const fetchAllOrdersWithUserID = ({id, token}) => {
  return async dispatch => {
    const loadOrders = await fetchOrders({
      id: id,
      token: token,
      page: page,
    });
    dispatch({type: GET_ALL_ORDER, orderItems: loadOrders});
  };
};
////////Admin
export const fetchCancelOrdersWithAdminRoles = ({token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrdersWithAdminRole({
      token: token,
      status: ORDER_STATUS.CANCEL,
      page: page,
    });
    dispatch({type: SET_CANCEL_ORDERS, orderItems: loadOrders});
  };
};
export const fetchWaitingOrdersWithAdminRoles = ({token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrdersWithAdminRole({
      token: token,
      status: ORDER_STATUS.WAITING,
      page: page,
    });
    dispatch({type: SET_WAITING_ORDERS, orderItems: loadOrders});
  };
};
export const fetchConfirmedOrdersWithAdminRoles = ({token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrdersWithAdminRole({
      token: token,
      status: ORDER_STATUS.CONFIRMED,
      page: page,
    });
    dispatch({type: SET_CONFIRMED_ORDERS, orderItems: loadOrders});
  };
};
export const fetchDeliveringOrdersWithAdminRoles = ({token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrdersWithAdminRole({
      token: token,
      status: ORDER_STATUS.DELIVERING,
      page: page,
    });
    dispatch({type: SET_DELIVERING_ORDERS, orderItems: loadOrders});
  };
};
export const fetchDeliveredOrdersWithAdminRoles = ({token, page}) => {
  return async dispatch => {
    const loadOrders = await fetchOrdersWithAdminRole({
      token: token,
      status: ORDER_STATUS.DELIVERED,
      page: page,
    });
    dispatch({type: SET_DELIVERED_ORDERS, orderItems: loadOrders});
  };
};

export const updateWaitingOrdersWithAdminRoles = ({orderID, token}) => {
  return async dispatch => {
    updateOrderWithAdminRole({orderID: orderID, token: token, status: ORDER_STATUS.WAITING});
  };
};
export const updateConfirmOrdersWithAdminRoles = ({orderID, token}) => {
  return async dispatch => {
    updateOrderWithAdminRole({orderID: orderID, token: token, status: ORDER_STATUS.CONFIRMED});
  };
};
export const updateDeliveringOrdersWithAdminRoles = ({orderID, token}) => {
  return async dispatch => {
    updateOrderWithAdminRole({orderID: orderID, token: token, status: ORDER_STATUS.DELIVERING});
  };
};
export const updateDeliveredOrdersWithAdminRoles = ({orderID, token}) => {
  return async dispatch => {
    updateOrderWithAdminRole({orderID: orderID, token: token, status: ORDER_STATUS.DELIVERED});
  };
};
export const updateCancelOrdersWithAdminRoles = ({orderID, token}) => {
  return async dispatch => {
    updateOrderWithAdminRole({orderID: orderID, token: token, status: ORDER_STATUS.CANCEL});
  };
};
export const updateOrdersWithAdminRoles  = ({
  token,
  orderID,
  userID,
  addressID,
  name,
  gender,
  phone,
  province,
  district,
  ward,
  quantity,
  totalCost,
  status,
  payment,
  paid,
}) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/order/admin/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userID: userID,
        addressID: addressID,
        name: name,
        gender: gender,
        phone: phone,
        province: province,
        district: district,
        ward: ward,
        quantity: quantity,
        totalCost: totalCost,
        status: status,
        payment: payment,
        paid: paid,
      }),
    });
  };
};
////////
const fetchOrdersWithAdminRole = async ({token, status, page}) => {
  try {
    const statusConvert = status ? `status=${status}&` : '';
    const pageConvert = page ? `page=${page}&` : '';
    console.log(`http://localhost:5000/order/admin?${statusConvert}${pageConvert}`)

    const response = await fetch(
      `http://localhost:5000/order/admin?${statusConvert}${pageConvert}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      },
    );
    if (response.error) {
      throw new Error(response.msg);
    }
    const resData = await response.json();
    const loadOrders = [];

    for (const key in resData) {
      loadOrders.push(
        new OrderModel({
          orderID: resData[key].id,
          userID: resData[key].user_id,
          name: resData[key].name,
          gender: resData[key].gender,
          phone: resData[key].phone,
          province: resData[key].province,
          district: resData[key].district,
          ward: resData[key].ward,
          street: resData[key].street,
          quantity: resData[key].quantity,
          totalCost: resData[key].total_cost,
          status: resData[key].status,
          payment: resData[key].payment,
          paid: resData[key].paid,
          createTime: resData[key].create_time,
          updateTime: resData[key].update_time,
        }),
      );
    }
    return loadOrders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const fetchOrders = async ({id, token, status, page}) => {
  const statusConvert = status ? `status=${status}&` : '';
  const pageConvert = page ? `page=${page}&` : '';
  try {
    const response = await fetch(
      `http://localhost:5000/order/user/${id}?${statusConvert}${pageConvert}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      },
    );
    if (response.error) {
      throw new Error(response.msg);
    }
    const resData = await response.json();
    const loadOrders = [];

    for (const key in resData) {
      loadOrders.push(
        new OrderModel({
          orderID: resData[key].id,
          userID: resData[key].user_id,
          name: resData[key].name,
          gender: resData[key].gender,
          phone: resData[key].phone,
          province: resData[key].province,
          district: resData[key].district,
          ward: resData[key].ward,
          street: resData[key].street,
          quantity: resData[key].quantity,
          totalCost: resData[key].total_cost,
          status: resData[key].status,
          payment: resData[key].payment,
          paid: resData[key].paid,
          createTime: resData[key].create_time,
          updateTime: resData[key].update_time,
        }),
      );
    }
    return loadOrders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateOrderWithAdminRole = async ({
  token,
  orderID,
  userID,
  addressID,
  name,
  gender,
  phone,
  province,
  district,
  ward,
  quantity,
  totalCost,
  status,
  payment,
  paid,
}) => {
  try{
    await fetch(`http://localhost:5000/order/admin/update/${orderID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userID: userID,
        addressID: addressID,
        name: name,
        gender: gender,
        phone: phone,
        province: province,
        district: district,
        ward: ward,
        quantity: quantity,
        totalCost: totalCost,
        status: status,
        payment: payment,
        paid: paid,
      }),
    });
  }catch(err){
    console.log(err)
  }
};
export const setCurrentOrder = (order) => {
  return async dispatch => {
    try {
      dispatch({type: SET_CURRENT_ORDER, order: order});
    } catch (error) {
      console.log(error);
      throw error;
    }
};
}