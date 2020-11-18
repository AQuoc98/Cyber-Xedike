import * as Types from "../constants/action-types";
let initialState = [];

const tripReducers = (state = initialState, action) => {
    switch(action.type) {
        case Types.STORE_TRIP_DATA:
            state = [...action.tripList];                
            return [...state];
        default:
            return [...state];
    }
}

export default tripReducers;