import {
    CREATE_CHANEL,
    GET_CHANEL,
    GET_MESSAGER,
    ADD_MESSAGER,
    GET_ALL_CHANEL,
    LOGOUT,
} from '../actions/chanelActions';
import messagerModel from '../../models/MessagerModel';
import ChanelModel from '../../models/ChanelModel';

const initialState = {
    _id: '2733b142e26a5e0838ffab0',
    userID: '0000',
    DATA_MESSAGES: [],
    LIST_CHANEL: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CHANEL:
            console.log("GET_CHANEL")
            return {
                ...state,
                _id: action.chanel._id,
                userID: action.chanel.userID,
               // DATA_MESSAGES: [],
            };
        case CREATE_CHANEL:
            console.log("GET_CHANEL")
            return {
                ...state,
                _id: action.chanel.chanelId,
                userID: action.chanel.userId,
                DATA_MESSAGES: [],
            };

        case GET_ALL_CHANEL:
           // console.log("GET_ALL_CHANEL")
            return {
                ...state,
                LIST_CHANEL: action.chanel,
            };

        case GET_MESSAGER:
            //console.log("GET_MESSAGER")
            return {
                ...state,
                DATA_MESSAGES: action.message,
            };
        case ADD_MESSAGER:
            console.log("ADD_MESSAGER")
            const newmessager = new messagerModel(
                action.message._id,
                action.message.chanelId,
                action.message.userID,
                action.message.text,
                action.message.isStaff,
                action.message.createAt,
            );
            return {
                ...state,
                DATA_MESSAGES: state.DATA_MESSAGES.concat(newmessager),
                // userProducts: state.userProducts.concat(newProduct),
            };
        case LOGOUT:
            return initialState;

    }
    return state;
};
