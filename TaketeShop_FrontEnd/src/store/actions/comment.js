import CommentModel from "../../models/comment/CommentModel";
import ImageModel from "../../models/image/imageModel";

export const ADD_COMMENT = 'ADD_COMMENT';
export const SET_COMMENT_WITH_PRODUCT_ID = 'SET_COMMENT_WITH_PRODUCT_ID';
export const SET_COMMENT = 'SET_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const fetchCommentWithProductID = (id) => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch('http://localhost:5000/comment/product/' + id);

      if (response.error) {
        throw new Error(response.msg);
      }

      const resData = await response.json();
      const loadedComment = [];
      for (const key in resData) {
        const images = [];
        if (resData[key].images) {
          const arrImage = resData[key].images.split(',');
          for (const image in arrImage) {
            const tempImage = arrImage[image].split(' ');
            images.push(new ImageModel(tempImage[0], tempImage[1]));
          }
        }
        loadedComment.push(
          new CommentModel(
            resData[key].id,
            resData[key].product_id,
            resData[key].user_id,
            resData[key].username,
            resData[key].avatar,
            resData[key].comment,
            resData[key].rating,
            images,
            resData[key].create_time,
            resData[key].update_time,
          ),
        );
      }

      dispatch({type: SET_COMMENT_WITH_PRODUCT_ID, comments: loadedComment});
    } catch (err) {
      // send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};
export const addComment = ({token, productID, userID, comment, rating, images}) => {
  return async dispatch => {
    try {
      await fetch(`http://localhost:5000/comment/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          productID: productID,
          userID: userID,
          comment: comment,
          rating: rating,
        }),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};