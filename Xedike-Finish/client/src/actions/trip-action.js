import axios from "axios";
import * as Types from "../constants/action-types";

export const actStoreTripsData = (tripList) => {
    return {
        type: Types.STORE_TRIP_DATA,
        tripList
    }
}

export const actGetTripList = () => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: 'http://localhost:1234/api/trip/getAllTrip'
        })
            .then(res => {
                dispatch(actStoreTripsData(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}