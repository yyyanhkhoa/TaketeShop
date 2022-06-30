import {
  CHANGE_AVATAR,
  CHANGE_BIRTHDAY,
  CHANGE_EMAIL,
  CHANGE_GENDER,
  CHANGE_NAME,
  CHANGE_PASSWORD,
  CHANGE_PHONE,
  LOGIN,
  LOGOUT,
} from '../actions/auth';

const initialState = {
  userID: '00',
  name: 'Khách',
  gender: '1',
  birthday: '0001/01/01',
  email: 'KoCoEmail@gmail.com',
  phone: '000000000',
  avatar:
    'https://4xucy2kyby51ggkud2tadg3d-wpengine.netdna-ssl.com/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg',
  role: 'GUEST',
  token: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.user.token,
        userID: action.user.id,
        name: action.user.name,
        gender: action.user.gender,
        birthday: action.user.birthday,
        email: action.user.email,
        avatar: action.user.avatar,
        role: action.user.role,
        phone: action.user.phone,

      };
    case CHANGE_NAME:
      return { ...state, name: action.value };
    case CHANGE_GENDER:
      return { ...state, gender: action.value };
    case CHANGE_BIRTHDAY:
      return { ...state, birthday: action.value };
    case CHANGE_EMAIL:
      return { ...state, email: action.value };
    case CHANGE_PHONE:
      return { ...state, phone: action.value };
    case CHANGE_AVATAR:
      return { ...state, avatar: action.value };
    case LOGOUT:
      return initialState;
      
    default:
      return state;
  }
};
