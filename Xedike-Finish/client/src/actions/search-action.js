import * as Types from "../constants/action-types";

export const changeSearchValue = (locationFrom, locationTo, startTime, availableSeats) => {
    return {
        type: Types.CHANGE_SEARCH_VALUE,
        values: {
            locationFrom,
            locationTo,
            startTime,
            availableSeats
        }
    }
}