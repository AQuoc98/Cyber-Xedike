const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true},
    phone: {type: String, required: true},
    fullName: {type: String},
    DOB: {type: String, required: true},
    registerDate: {type: Date, default: new Date()},
    avatar: {type: String},
    isActive: {type: Boolean, default: false},
    numberOfTrips: {type: Number, default: 0}
})

const User = mongoose.model("User", UserSchema);
module.exports = {
    User, UserSchema
}