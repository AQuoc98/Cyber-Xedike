import * as Types from "../constants/action-types";

let initialState = {};

const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        case Types.GET_ERRORS:
            return action.payload;
        default:
            return {...state};
    }
}

export default errorReducer;