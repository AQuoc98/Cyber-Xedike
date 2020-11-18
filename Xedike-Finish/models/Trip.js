const mongoose = require("mongoose");

const TripSchema = {
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        required: true
    },
    locationFrom :{type: String, required: true},
    locationTo: {type: String, required: true},
    startTime: {type: Date, required: true, default: new Date().toString()},
    availableSeats: {type: Number, min: 2, required: true},
    fee: {type: Number, required: true},
    isFinished: {type: Boolean, required: true, default: false},
    passengers: [{
        passengerId: {type: String},
        locationGetIn: {type: String},
        locationGetOff: {type: String},
        paymentMethod: {type: String},
        numberOfBookingSeats: {type: Number},
        notes: {type: String}
    }]
}

const Trip = mongoose.model("Trip", TripSchema);

module.exports = {
    Trip, TripSchema
}