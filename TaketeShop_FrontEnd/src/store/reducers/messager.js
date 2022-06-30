import {
    GET_MESSAGER,
    ADD_MESSAGER
} from '../actions/chanelActions';

const messageModel = ([]);
const initialState = {
    _id: '62735cd32e26a5e0838ffb11',
    userID: 5,
    chanelId: '62733b142e26a5e0838ffab0',
    text: 'hello',
    isStaff: true,
    createAt: "2022-05-05T17:00:00.000Z"

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGER:
            return {
                userID: action.messager.userID,
                _id: action.messager._id,
                chanelId: action.messager.chanelId,
                text: action.messager.text,
                isStaff: action.messager.isStaff,
                createAt: action.messager.createAt
            };
        // case ADD_MESSAGER:
        //     const addMess = new messageModel(
        //         action.messager.userID,
        //         action.messager._id,
        //         action.messager.chanelId,
        //         action.messager.text,
        //         action.messager.isStaff,
        //         action.messager.createAt
        //     )
        //     return {
        //         ...state

        //     };
        default:
            return state;
    }
    return state;
};
