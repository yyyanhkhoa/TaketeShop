import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../../models/UserModel';


export const GET_ALL_STAFF = 'GET_ALL_CHANEL';
export const GET_STAFF = 'GET_STAFF';
export const GET_USER = 'GET_USER';
export const LOGOUT = 'LOGOUT';
//export const DELETE_STAFF = 'DELETE_STAFF';

export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_GENDER = 'CHANGE_GENDER';
export const CHANGE_BIRTHDAY = 'CHANGE_BIRTHDAY';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PHONE = 'CHANGE_PHONE';
export const CHANGE_AVATAR = 'CHANGE_AVATAR';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const getAllStaff = (token) => {
    return async dispatch => {
        try {           
            const response = await fetch(`http://localhost:5000/user/getAllStaff`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: 'Bearer ' + token,
                },
              });
            if (response.error) {
                throw new Error(response.error);
            }
            const resData = await response.json();           
            const loadedAllChanel = [];
            // userID, username, password, name, birthday, gender, email, phone, type, avatar, createTime, updateTime
            for (const key in resData) {
                if (resData[key].type === 'STAFF') {
                    loadedAllChanel.push(
                        new User(                            
                            resData[key].id, //userID
                            resData[key].username, //username
                            resData[key].password, //pass
                            resData[key].name,
                            resData[key].birthday, //birth
                            resData[key].gender,//gender
                            resData[key].email,//email
                            resData[key].phone,//phone
                            resData[key].type,//type
                            resData[key].avatar,
                            resData[key].create_time, //createtime
                            resData[key].create_time, //updateTime
                        ),
                    );
                }

            }
            dispatch({ type: GET_ALL_STAFF, chanel: loadedAllChanel });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const getStaffFromUserID = (userId, token) => {
    return async dispatch => {

       // const response = await fetch(`http://localhost:5000/user/${userId}`);
        const response = await fetch(`http://localhost:5000/user/admin/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + token,
            },
          });

        const resData = await response.json();
        const error = resData.error;

        if (error) {
            console.log(resData.msg)
        }
        dispatch({
            type: GET_STAFF,
            user: {
                //token: resData.token,
                id: userId,
                name: resData.name,
                gender: resData.gender,
                birthday: resData.birthday,
                email: resData.email,
                avatar: resData.avatar,
                role: resData.role,
                phone: resData.phone,
            },
        });
    };
};


export const changeName = (userId, token, value) => {
    return async dispatch => {
      await fetch(
        `http://localhost:5000/user/addmin/staff/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            name: value
          })
        },
      );
  
      dispatch({ type: CHANGE_NAME, value: value });
    };
  };
  
  export const deleteStaff = (userId, token) => {
    return async dispatch => {
      await fetch(
        `http://localhost:5000/user/addmin/staff/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            type: 'BANNED'
          })
        },
      );  
      
    };
  };
  // export const deleteStaff = (userId, token) => {
  //   return async dispatch => {
  //     await fetch(
  //       `http://localhost:5000/user/addmin/staff/${userId}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: 'Bearer ' + token,
  //         },         
  //       },
  //     );
  //    // getAllStaff(token);
      
  //   };
  // };

  export const changeGender = (userId, token, value) => {
    return async dispatch => {
      await fetch(
        `http://localhost:5000/user/addmin/staff/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            gender: value
          })
        },
      );
  
      dispatch({ type: CHANGE_GENDER, value: value });
    };
  };
  export const changeBirthday = (userId, token, value) => {
    return async dispatch => {
      await fetch(
        `http://localhost:5000/user/addmin/staff/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            birthday: value
          })
        },
      );
  
      dispatch({ type: CHANGE_BIRTHDAY, value: value });
    };
  };
  export const changeEmail = (userId, token, value) => {
    return async dispatch => {
      await fetch(
        `http://localhost:5000/user/addmin/staff/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            email: value
          })
        },
      );
  
      dispatch({ type: CHANGE_EMAIL, value: value });
    };
  };
  export const changePhone = (userId, token, value) => {
    return async dispatch => {
      await fetch(
        `http://localhost:5000/user/addmin/staff/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            phone: value
          })
        },
      );
  
      dispatch({ type: CHANGE_PHONE, value: value });
    };
  };
  export const changeAvatar = (userId, token, value) => {
    return async dispatch => {
      await fetch(
        `http://localhost:5000/user/addmin/staff/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            avatar: value
          })
        },
      );
  
      dispatch({ type: CHANGE_AVATAR, value: value });
    };
  };
  
  export const changePassword = (userId, token, newpass) => {
    return async dispatch => {
      console.log("aa " + newpass + "pass");
      const response = await fetch(       
        `http://localhost:5000/user/addmin/staff/password/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({           
            newPass: newpass,         
          })
        },
      );     
      const resData = await response.json();
      const error = resData.error;
  
      if (error) {
        alert(resData.msg);
      }
    };
  };


export const getUser = () => {
    return { type: GET_USER };
};

export const logout = () => {
    return { type: LOGOUT };
};

