import * as Types from "../constants/action-types";

let initialState = {
    locationFrom: '',
    locationTo: '',
    startTime: new Date(),
    availableSeats: 1
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_SEARCH_VALUE:
            return {
                ...state,
                locationFrom: action.values.locationFrom,
                locationTo: action.values.locationTo,
                startTime: action.values.startTime,
                availableSeats: action.values.availableSeats
            }
        default:
            return { ...state };
    }
}

export default searchReducer;


