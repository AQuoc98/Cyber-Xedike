import * as Types from "../constants/action-types";
let initialState = [];

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case Types.STORE_USER_DATA:
            state = [...action.userList];                
            return [...state];
        default:
            return [...state];
    }
}

export default userReducer;