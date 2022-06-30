import AsyncStorage from '@react-native-async-storage/async-storage';
import messagerModel from '../../models/MessagerModel';
import ChanelModel from '../../models/ChanelModel';
import User from '../../models/UserModel';

export const CREATE_CHANEL = 'CREATE_CHANEL';
export const GET_CHANEL = 'GET_CHANEL';

export const GET_ALL_CHANEL = 'GET_ALL_CHANEL';
export const GET_MESSAGER = 'GET_MESSAGER';
export const ADD_MESSAGER = 'ADD_MESSAGER';
export const CHANGE_NAME = 'CHANGE_NAME';
export const LOGOUT = 'LOGOUT';


export const getChanel = (userId) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://localhost:5000/chanel/` + userId);//+userId);
            const resData = await response.json();
            const error = resData.error;
            if (error) {
                console.log(error)
            }

            // const chanel = resData[0]._id;           
            console.log("GET_CHANEL  Success :" + resData[0]._id)
            dispatch({
                type: GET_CHANEL,
                chanel: {
                    _id: resData[0]._id,
                    userID: userId,
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }

    };
};

export const getAllChanel = () => {
    return async dispatch => {
        try {
            //const response = await fetch(`http://localhost:5000/chanel/`);
            const response = await fetch(`http://localhost:5000/user/getAllUser`);
            if (response.error) {
                throw new Error(response.error);
            }
            const resData = await response.json();
            console.log("GET_ALL_CHANEL  Success:" + resData.length)
            const loadedAllChanel = [];
            // userID, username, password, name, birthday, gender, email, phone, type, avatar, createTime, updateTime
            for (const key in resData) {
                loadedAllChanel.push(
                    new User(
                        resData[key].id, //userID
                        null, //username
                        null, //pass
                        resData[key].name,
                        null, //birth
                        null,//gender
                        null,//email
                        null,//phone
                        resData[key].type,//type
                        resData[key].avatar,
                        null, //createtime
                        null, //updateTime
                    ),
                );
            }
            dispatch({ type: GET_ALL_CHANEL, chanel: loadedAllChanel });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const createChanel = (user_id) => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch('http://localhost:5000/chanel/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user_id,
            }),
        });
        const resData = await response.json();
        const error = resData.error;
        if (error) {
            console.log("create Chanel error")
        }
        console.log("create Chanel ok")
        dispatch({
            type: CREATE_CHANEL,
            chanel: {
                chanelId: resData._id,
                userId: user_id,
            },
        });
    };
}


export const getMessagerFromChanelId = (chanelId,token) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://localhost:5000/message/chanel/` + chanelId,
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
            // console.log("get DATA_MESSAGES ok");

            const loadedMessagers = [];

            for (const key in resData) {
                loadedMessagers.push(
                    new messagerModel(
                        resData[key]._id,
                        resData[key].chanelId,
                        resData[key].userId,
                        resData[key].text,
                        resData[key].isStaff,
                        resData[key].createAt
                    ),
                );
            }

            dispatch({ type: GET_MESSAGER, message: loadedMessagers });

        } catch (err) {
            // send to custom analytics server
            console.log(err);
            throw err;
        }

    };
};

export const getMessagerFromChanelIdSTAFF = (chanelId,token) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://localhost:5000/message/staff/chanel/` + chanelId,
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
            // console.log("get DATA_MESSAGES ok");

            const loadedMessagers = [];

            for (const key in resData) {
                loadedMessagers.push(
                    new messagerModel(
                        resData[key]._id,
                        resData[key].chanelId,
                        resData[key].userId,
                        resData[key].text,
                        resData[key].isStaff,
                        resData[key].createAt
                    ),
                );
            }

            dispatch({ type: GET_MESSAGER, message: loadedMessagers });

        } catch (err) {
            // send to custom analytics server
            console.log(err);
            throw err;
        }

    };
};

export const getMessagerFromChanelIdADMIN = (chanelId,token) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://localhost:5000/message/admin/chanel/` + chanelId,
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
            // console.log("get DATA_MESSAGES ok");

            const loadedMessagers = [];

            for (const key in resData) {
                loadedMessagers.push(
                    new messagerModel(
                        resData[key]._id,
                        resData[key].chanelId,
                        resData[key].userId,
                        resData[key].text,
                        resData[key].isStaff,
                        resData[key].createAt
                    ),
                );
            }

            dispatch({ type: GET_MESSAGER, message: loadedMessagers });

        } catch (err) {
            // send to custom analytics server
            console.log(err);
            throw err;
        }

    };
};

export const addMessager = (chanelId, userId, text, isStaff) => {
    return async dispatch => {
        const timer = await Date.now;
        const response = await fetch(
            'http://localhost:5000/message/add/' + chanelId,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chanelId: chanelId,
                    userId: userId,
                    text: text,
                    isStaff: isStaff,
                    createAt: timer,
                }),
            },
        );
        const resData = await response.json();
        const error = resData.error;
        console.log("_ID cuar :" + resData._id)
        if (error) {
            console.log(error)
        }
        dispatch({
            type: ADD_MESSAGER,
            message: {
                _id: resData._id,
                chanelId: chanelId,
                userID: userId,
                text: text,
                isStaff: isStaff,
                createAt: resData.createAt
            },
        });



    };
};

export const logout = () => {
    return { type: LOGOUT };
};