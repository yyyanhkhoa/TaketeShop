import DiscountModel from "../../models/discount/DiscountModel";

//export const ADD_DISCOUNT = 'ADD_DISCOUNT';
export const SET_DISCOUNT = 'SET_DISCOUNT';
export const GET_DISCOUNT = 'GET_DISCOUNT';
export const DELETE_DISCOUNT = 'DELETE_DISCOUNT';
export const fetchDiscount = () => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch('http://localhost:5000/discount/all');
      if (response.error) {

        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedDiscount = [];
      for (const key in resData) {
        loadedDiscount.push(
          new DiscountModel(
            resData[key].id,
            resData[key].category_id,
            resData[key].voucher,
            resData[key].discount,
            resData[key].membership,
            resData[key].end_time,
          ),
        );
      }

      dispatch({ type: SET_DISCOUNT, discounts: loadedDiscount });
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const createDiscount = (categoryID, voucher, discount, membership, endTime,) => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:5000/discount/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category_id: categoryID,
            voucher: voucher,
            discount: discount,
            membership: membership,
            end_time: endTime,
          }),
        });

    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
}
export const fixDiscountWithDay = (ID, categoryID, voucher, discount, membership, endTime) => {
  return async dispatch => {
    await fetch(
      'http://localhost:5000/discount/' + ID,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' ,
        },
        body: JSON.stringify({
          category_id: categoryID,
          voucher: voucher,
          discount: discount,
          membership: membership,
          end_time: endTime,
        })
      },
    );  
  };
};
export const fixDiscount = (ID, categoryID, voucher, discount, membership) => {
  return async dispatch => {    
    await fetch(     
      'http://localhost:5000/discount/' + ID,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',         
        },
        body: JSON.stringify({
          category_id: categoryID,
          voucher: voucher,
          discount: discount,
          membership: membership,         
        })
      },
    );  
  };
};
// export const fixDiscount = (ID, categoryID, voucher, discount, membership, endTime) => {
//   return async dispatch => {
//     try {
//       const response = await fetch('http://localhost:5000/discount/' + ID,
//         {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//             authorization: 'Bearer ',
//           },
//           body: JSON.stringify({
//             category_id: categoryID,
//             voucher: voucher,
//             discount: discount,
//             membership: membership,
//             end_time: endTime,
//           }),
//         });

//     } catch (err) {
//       // send to custom analytics server
//       console.log(err);
//       throw err;
//     }
//   };
// }
export const getDiscountByID = (discountID) => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch('http://localhost:5000/discount/' + discountID);

      if (response.error) {

        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedDiscount = new DiscountModel(
        resData[0].id,
        resData[0].category_id,
        resData[0].voucher,
        resData[0].discount,
        resData[0].membership,
        resData[0].end_time,
      );

      dispatch({ type: GET_DISCOUNT, discounts: loadedDiscount });
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const deleteDiscount = (discountID) => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch('http://localhost:5000/discount/' + discountID,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      dispatch({ type: DELETE_DISCOUNT, discounts: discountID });
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};