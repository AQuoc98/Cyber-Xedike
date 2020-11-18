const validator = require("validator");

// Validate Driver Profile

module.exports.validateDriverProfile = (req, res, next) => {
  let errors = {};
  const { address, passportId, job } = req.body;

  if (validator.isEmpty(address)) {
    errors.address = "Address required";
  } else if (!validator.isLength(address, { min: 6, max: 50 })) {
    errors.address = "Address must be 6 - 50 characters";
  }

  if (validator.isEmpty(passportId)) {
    errors.passportId = "Passport id required";
  } else if (!validator.isLength(passportId, { min: 6, max: 30 })) {
    errors.passportId = "Passport id must be 6 - 30 characters";
  }

  if (validator.isEmpty(job)) {
    errors.job = "Job required";
  }

  if (Object.keys(errors).length) {
    return res.status(400).json(errors);
  }
  next();
};

// Validate Driver Car

module.exports.validateDriverCar = (req, res, next) => {
  let errors = {};
  const {
    brand,
    model,
    manufacturingYear,
    licensePlate,
    numberOfSeats
  } = req.body;

  if (validator.isEmpty(brand)) {
    errors.brand = "Car's brand required";
  } else if (!validator.isLength(brand, { min: 1, max: 30 })) {
    errors.brand = "Car's brand must be 1 - 30 characters";
  }

  if (validator.isEmpty(model)) {
    errors.model = "Car's model required";
  } else if (!validator.isLength(model, { min: 1, max: 30 })) {
    errors.brand = "Car's model must be 1 - 30 characters";
  }

  if (validator.isEmpty(manufacturingYear)) {
    errors.manufacturingYear = "manufacuring year requried";
  } else if (!validator.isNumeric) {
    errors.manufacturingYear = "Manufacuring year must be number";
  }

  if (validator.isEmpty(licensePlate)) {
    errors.licensePlate = "License plate required";
  } else if (!validator.isLength(licensePlate, { min: 1, max: 10 })) {
    errors.licensePlate = "License plate must be 1 - 10 characters";
  }

  if (validator.isEmpty(numberOfSeats)) {
    errors.numberOfSeats = "Number of seat required";
  } else if (!validator.isNumeric(numberOfSeats)) {
    errors.numberOfSeats = "Number of seat must be number";
  } else if (parseInt(numberOfSeats) < 1 || parseInt(numberOfSeats) > 36) {
    errors.numberOfSeats = "Min is 2 seats and max is 36";
  }

  if (Object.keys(errors).length) {
    return res.status(400).json(errors);
  }
  next();
};
