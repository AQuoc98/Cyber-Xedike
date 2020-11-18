import _ from 'lodash';
import * as Types from "../constants/action-types";


const intialState = {
    isAuthenticated: false,
    user: {},
    driverProfile: {}
}

const authReducer = (state = intialState, action) => {
    switch (action.type) {
        case Types.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !_.isEmpty(action.payload)
            }
        case Types.SET_DRIVER_PROFILE:
            return {
                ...state,
                driverProfile: action.driverProfile
            }
        default:
            return { ...state };
    }
}

export default authReducer;

