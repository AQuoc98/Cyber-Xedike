// TODO: require package from npm
const express = require("express");
const passport = require("passport");
const upload = require("../../../config/upload");

const {
  validateRegister,
  validateLogin
} = require("../../../validation/validateUser");
const { authorizing } = require("../../../middleware/auth");
const userController = require("./usersController");

const router = express.Router();

// route: api/user/register
// desc: register
// access: public
router.post("/register", validateRegister, userController.createUser);

// route: api/user/login
// desc: login
// access: public
router.post("/login", validateLogin, userController.login);

// route: api/user/getUsersList
// desc: get user list
// access: public
router.get("/getUsersList", userController.getUserList);

// route: api/user/testPassport
// desc: test pass authentication
// access: private (passenger)
router.get(
  "/testPassport",
  passport.authenticate("jwt", { session: false }),
  authorizing("passenger"),
  (req, res) => {
    return res.status(200).json(req.user);
  }
);

// route: api/user/deleteAccount
// desc: delete user
// access: private
router.delete(
  "/deleteAccount",
  passport.authenticate("jwt", { session: false }),
  userController.deleteAccount
);

// Xoá tất cả user
router.delete("/deleteAllUser", userController.deleteAll);
router.delete("/deleteAllDriver", userController.deleteAllDriver);

// route: api/user/updateAccount
// desc:  update account
// access: private
router.patch(
  "/updateAccount",
  passport.authenticate("jwt", { session: false }),
  userController.updateAccount
);

// route: api/user/uploadAvatar
// desc: upload avatar
// access: private
router.post(
  "/uploadAvatar",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  userController.uploadAvatar
);

// route: api/user/:userId
// desc: get user info
// status: public
router.get("/:userId", userController.getUserInfo);

// route: api/user/changePassword
// desc:  change user's password
// status: private
router.patch(
  "/changePassword",
  passport.authenticate("jwt", { session: false }),
  userController.changePassword
);

// route: api/user/rateDriver/:driverId
// desc:  rate driver
// access: private (passenger)
router.post("/rateDriver/:driverId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("passenger"),
    userController.rateDriver
)


// route: api/user/getUserTrip
// desc:  get user's history trip
// access: private (passenger)
router.get("/getUserTrip/:tripId", 
    passport.authenticate("jwt", {session: false}),
    authorizing("passenger"),
    userController.getUserHistoryTrip
)

module.exports = router;
