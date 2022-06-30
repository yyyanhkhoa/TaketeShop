import { SET_COMMENT_WITH_PRODUCT_ID } from "../actions/comment";

const initialState = {
    productComments: [],
    rating: 0,
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_COMMENT_WITH_PRODUCT_ID:{
            return {productComments: action.comments, rating: () => {
                let avg = 0;
                for(const key in action.comments){
                    avg += action.comments[key].rating
                }
                return avg/action.comments.length
            }}
        }
    }
    return state;
}
