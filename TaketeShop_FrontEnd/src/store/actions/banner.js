import BannerModel from "../../models/banner/BannerModel";

export const ADD_BANNER = 'ADD_BANNER';
export const GET_BANNER = 'GET_BANNER';
export const SET_BANNER = 'SET_BANNER';
export const DELETE_BANNER = 'DELETE_BANNER';
export const fetchBanner = () => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch('http://localhost:5000/banner/all');

      if (response.error) {

        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedBanner = [];
      for (const key in resData) {
        const productIDs = resData[key].productID ? resData[key].productID.split(',').map(item => parseInt(item, 10)) : [];
        loadedBanner.push(
          new BannerModel(
            resData[key].id,
            resData[key].title,
            resData[key].discount,
            resData[key].endTime,
            resData[key].image,
            productIDs,
            resData[key].create_time,
            resData[key].update_time,
          ),
        );
      }

      dispatch({ type: SET_BANNER, banners: loadedBanner });
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};

export const getBannerByID = (bannerID) => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch('http://localhost:5000/banner/' + bannerID);

      if (response.error) {

        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedBanner = [];
      const productIDs = resData[0].productID ? resData[0].productID.split(',').map(item => parseInt(item, 10)) : [];
      loadedBanner.push(
        new BannerModel(
          resData[0].id,
          resData[0].title,
          resData[0].discount,
          resData[0].endTime,
          resData[0].image,
          productIDs,
          resData[0].create_time,
          resData[0].update_time,
        ),
      );


      dispatch({ type: GET_BANNER, banners: loadedBanner });
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};

export const deleteBanner = (bannerID) => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch('http://localhost:5000/banner/' + bannerID, 
      {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },       
      });
      dispatch({ type: DELETE_BANNER, banners: bannerID });
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};