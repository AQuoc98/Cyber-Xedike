// TODO: require package from npm
const express = require("express");
const passport = require("passport");

const { authorizing } = require("../../../middleware/auth");
const upload = require("../../../config/upload");
const {
  validateDriverProfile,
  validateDriverCar
} = require("../../../validation/validateDriver");
const driverController = require("./driversController");

const router = express.Router();


//--------------------Driver Profile-------------------------

// route: api/user/driver/createProfile
// desc: create profile for driver
// access: private (driver)
router.post(
  "/createProfile",
  passport.authenticate("jwt", { session: false }),
  authorizing("driver"),
  driverController.createDriverProfile
);

// route: api/user/driver/:driverId
// desc: get driver info
// access: public
router.get("/:driverId", driverController.getDriverProfile);

// route: api/user/driver/adjustDriverProfile
// desc: Update profile for driver
// access: private (driver)
router.post(
  "/adjustDriverProfile",
  passport.authenticate("jwt", { session: false }),
  authorizing("driver"),
  validateDriverProfile,
  driverController.adjustDriverProfile
);


// route: api/user/driver/deleteProfile
// desc: delete driver's profile
// access: private (driver)
router.delete(
  "/deleteProfile",
  passport.authenticate("jwt", { session: false }),
  authorizing("driver"),
  driverController.deleteDriverProfile
);

//--------------------Car-------------------------

// route: api/user/driver/addCar
// desc: add car for driver
// access: private (driver)
router.post(
  "/addCar",
  passport.authenticate("jwt", { session: false }),
  authorizing("driver"),
  driverController.addDriverCar
);


// route: api/user/driver/addCarImage/:carId
// desc: add image for car
// access: private (driver)
router.patch(
  "/addCarImage/:carId",
  passport.authenticate("jwt", { session: false }),
  authorizing("driver"),
  upload.single("carImage"),
  driverController.addCarImage
);

// route: api/user/driver/updateCar/:carId
// desc: update car
// access: private (driver)
router.patch(
  "/updateCar/:carId",
  passport.authenticate("jwt", { session: false }),
  authorizing("driver"),
  driverController.updateDriverCar
);

// route: api/user/driver/deleteCar/:carId
// desc: delete driver's car
// access: private (driver)
router.delete(
  "/deleteCar/:carId",
  passport.authenticate("jwt", { session: false }),
  authorizing("driver"),
  driverController.deleteDriverCar
);

// route: api/user/driver/getDriverTrip
// desc: get driver's trips created
// access: private (driver)
router.get(
  "/getDriverTrip/:tripId",
  passport.authenticate("jwt", { session: false }),
  authorizing("driver"),
  driverController.getDriverTrip
);



module.exports = router;
