import {
    CHANGE_AVATAR,
    CHANGE_BIRTHDAY,
    CHANGE_EMAIL,
    CHANGE_GENDER,
    CHANGE_NAME,
    CHANGE_PASSWORD,
    CHANGE_PHONE,
    GET_ALL_STAFF,
    GET_STAFF,
    LOGOUT,
    GET_USER,   
} from '../actions/ListStaff';


const initialState = {
    admin: false,
    userID: '0000',
    name: 'Khách',
    gender: 'Không xác định',
    birthday: '0001/01/01',
    email: 'abc@gmail.com',
    phone: '0122789201',
    avatar:
        'https://4xucy2kyby51ggkud2tadg3d-wpengine.netdna-ssl.com/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg',
    role: 'CUSTOMER',
    // token: null,
    LIST_STAFF: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_STAFF:
            console.log("GET_STAFF")
            return {
                ...state,
                admin: true,
                //token: action.user.token,
                userID: action.user.id,
                name: action.user.name,
                gender: action.user.gender,
                birthday: action.user.birthday,
                email: action.user.email,
                avatar: action.user.avatar,
                role: action.user.role,
                phone: action.user.phone,
                avatar: action.user.avatar,
            };
        case GET_USER:
            console.log("GET_USER")
            return {
                ...state,
                admin: false,
            };
        case GET_ALL_STAFF:
            //console.log("GET_ALL_STAFF")
            return {
                ...state,
                LIST_STAFF: action.chanel,
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

    }
    return state;
};
