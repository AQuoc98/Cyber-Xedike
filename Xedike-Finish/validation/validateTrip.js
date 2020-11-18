const validator = require("validator");

module.exports.validateCreateTrip = (req, res, next) => {
    let errors = {};
    const {locationFrom, locationTo, availableSeats, fee} = req.body;

    if(validator.isEmpty(locationFrom)){
        errors.locationFrom = "Location from required";
    }
    
    if(validator.isEmpty(locationTo)){
        errors.locationTo = "Location to required";
    }


    if(validator.isEmpty(availableSeats)){
        errors.availableSeats = "available seats required";
    }
    else if(!validator.isNumeric(availableSeats)){
        errors.availableSeats = "Must be number";
    }
    else if(parseInt(availableSeats) < 1 || parseInt(availableSeats) > 36){
        errors.availableSeats = "Booking seats min is 1 and max is 36";
    }

    if(validator.isEmpty(fee)){
        errors.fee = "Fee required";
    }
    else if(!validator.isNumeric(fee)){
        errors.fee = "Must be number";
    }

    if(Object.keys(errors).length){
        return res.status(400).json(errors);
    }
    next();
}