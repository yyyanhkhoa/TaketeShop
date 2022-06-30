import AddressModel from '../../models/location/AddressModel';
import DistrictModel from '../../models/location/DistrictModel';
import ProvinceModel from '../../models/location/ProvinceModel';
import WardModel from '../../models/location/WardModel';

export const SET_ADDRESS = 'SET_ADDRESS';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const SELECT_ADDRESS = 'SELECT_ADDRESS';

export const SET_PROVINCES = 'SELECT_PROVINCES';
export const SET_DISTRICTS = 'SELECT_DISTRICTS';
export const SET_WARDS = 'SELECT_WARDS';

export const fetchAddress = userID => {
  return async dispatch => {
    try {
      const response = await fetch(
        'http://localhost:5000/address/user/all/' + userID,
      );
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();
      const loadAddress = [];

      for (const key in resData) {
        loadAddress.push(
          new AddressModel({
            addressID: resData[key].id,
            provinceID: resData[key].province_id,
            districtID: resData[key].district_id,
            wardID: resData[key].ward_id,
            userID: resData[key].user_id,
            name: resData[key].name,
            gender: resData[key].gender,
            phone: resData[key].phone,
            province: resData[key].province,
            district: resData[key].district,
            ward: resData[key].ward,
            street: resData[key].street,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_ime,
          }),
        );
      }
      if (loadAddress.length) loadAddress[0].isSelected = true;
      dispatch({type: SET_ADDRESS, addresses: loadAddress});
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const deleteAddressByID = (token, addressID) => {
  return async dispatch => {
    try {
      await fetch(`http://localhost:5000/address/${addressID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      }).then(dispatch({type: DELETE_ADDRESS, id: addressID}));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const addAddress = (
  token,
  userID,
  phone,
  provinceID,
  districtID,
  wardID,
  street,
  gender,
  name,
) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/address/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userID: userID,
        phone: phone,
        provinceID: provinceID,
        districtID: districtID,
        wardID: wardID,
        street: street,
        gender: gender,
        name: name,
      }),
    });

    dispatch({
      type: ADD_ADDRESS,
      address: {
        userID: userID,
        phone: phone,
        provinceID: provinceID,
        districtID: districtID,
        wardID: wardID,
        street: street,
        name: name,
      },
    });
  };
};
export const updateAddress = (
  token,
  id,
  userID,
  phone,
  provinceID,
  districtID,
  wardID,
  street,
  gender,
  name,
) => {
  return async dispatch => {
    await fetch(`http://localhost:5000/address/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userID: userID,
        phone: phone,
        provinceID: provinceID,
        districtID: districtID,
        wardID: wardID,
        street: street,
        gender: gender,
        name: name,
      }),
    });

    dispatch({
      type: UPDATE_ADDRESS,
      address: {
        userID: userID,
        phone: phone,
        provinceID: provinceID,
        districtID: districtID,
        wardID: wardID,
        street: street,
        name: name,
      },
    });
  };
};
export const selectAddressItem = itemID => {
  return async dispatch => {
    dispatch({type: SELECT_ADDRESS, id: itemID});
  };
};
export const fetchProvinces = () => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:5000/address/provinces', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();
      const loadProvinces = [];
      for (const key in resData) {
        loadProvinces.push(
          new ProvinceModel({
            provinceID: resData[key].id,
            name: resData[key].name,
            code: resData[key].code,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }

      dispatch({type: SET_PROVINCES, provinces: loadProvinces});
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const fetchDistrictsWithProvinceID = provinceID => {
  return async dispatch => {
    try {
      const response = await fetch(
        `http://localhost:5000/address/districts?province=${provinceID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();
      const loadDistricts = [];

      for (const key in resData) {
        loadDistricts.push(
          new DistrictModel({
            districtID: resData[key].id,
            province: resData[key].province_id,
            name: resData[key].name,
            prefix: resData[key].prefix,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }

      dispatch({type: SET_DISTRICTS, districts: loadDistricts});
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const fetchWardWithProvinceIDAndProvinceID = (provinceID, wardID) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `http://localhost:5000/address/wards?province=${provinceID}&district=${wardID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.error) {
        throw new Error(response.msg);
      }
      const resData = await response.json();
      const loadWards = [];

      for (const key in resData) {
        loadWards.push(
          new WardModel({
            wardID: resData[key].id,
            province: resData[key].province_id,
            district: resData[key].district_id,
            name: resData[key].name,
            prefix: resData[key].prefix,
            createTime: resData[key].create_time,
            updateTime: resData[key].update_time,
          }),
        );
      }

      dispatch({type: SET_WARDS, wards: loadWards});
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
