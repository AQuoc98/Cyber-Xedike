// TODO: require package from npm
const express = require("express");
const passport = require("passport");

const {authorizing} = require("../../../middleware/auth");
const {validateCreateTrip} = require("../../../validation/validateTrip");
const tripController = require("./tripController");

const router = express.Router();



// route: api/trip/createTrip
// desc: create a trip
// access: private (driver)
router.post("/createTrip", 
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    tripController.createTrip
);

// route: api/trip/getAllTrip
// desc: get all trip
// access: public
router.get("/getAllTrip", tripController.getTrips);

// route: api/trip/finishTrip/:tripId
// desc: finished a trip
// access: private (driver)
router.patch("/finishTrip/:tripId",
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    tripController.finishTrip
);

// route: api/trip/updateTrip/:tripId
// desc: update a trip
// access: private (driver)
router.patch("/updateTrip/:tripId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    validateCreateTrip,
    tripController.updateTrip
);

// route: api/trip/deleteTrip/:tripId
// desc: delete a trip
// access: private (driver)
router.delete("/deleteTrip/:tripId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("driver"),
    tripController.deleteTrip
);

// route: api/trip/bookTrip/:tripId
// desc: book a trip
// access: private (passenger)
router.post("/bookTrip/:tripId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("passenger"),
    tripController.bookTrip
);

// route: api/trip/cancelTrip/:tripId
// desc: cancel a trip
// access: private (passenger)
router.post("/cancelTrip/:tripId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("passenger"),
    tripController.cancelTrip
);



module.exports = router;
