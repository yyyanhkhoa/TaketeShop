import { SET_BANNER, GET_BANNER, DELETE_BANNER } from "../actions/banner";

const initialState = {
  currentBanner: {},
  banners: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BANNER: {
      return { banners: action.banners }
    }
    case GET_BANNER: {
      return {
        ...state,
        currentBanner: action.banners,
      }
    }
    case DELETE_BANNER: {
      return {
        ...state,
        banners: state.banners.filter((ID) => ID.id !== action.banners),
      }
    }
  }
  return state;
}