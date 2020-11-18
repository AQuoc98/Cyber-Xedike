// TODO: require package from npm
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


// TODO: require model 
const {User} = require("../../../models/User");
const {Driver} = require("../../../models/Driver");
const {Trip} = require("../../../models/Trip");
const secretKey = process.env.SECRET_KEY;



// Register
module.exports.createUser = (req, res) => {
    const { email, password, fullName, userType, phone, DOB } = req.body;
    let errors = {};
    // find if user is existed
    User.findOne({ $or: [{ email }, { phone }] })
    .then(user => {
        if (user) {
            if (user.email === email) errors.email = "Email existed";
            if (user.phone === phone) errors.phone = "Phone existed";
            return res.status(400).json(errors);
        }


        const newUser = new User({ email, password, fullName, userType, phone, DOB });

        // salt password to secret code and save
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(400).json(err);
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) return res.status(400).json(err);
                newUser.password = hash;

                newUser.save()
                    .then(user => {
                        return res.status(200).json(user)
                    })
                    .catch(console.log)
            })
        })
    })
}

// Login
module.exports.login = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({email: 'Email doesnt match'});

            bcrypt.compare(password, user.password) // so sánh password nhập vs password dc hash
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({password: 'Wrong password'});

                    
                    const payload = {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        userType: user.userType,
                        avatar: user.avatar
                    }

                    // Nếu trùng khớp thì trả về 1 chuỗi token để xác nhận user đăng nhập
                    jwt.sign(
                        payload,
                        secretKey,
                        {expiresIn: 3600},
                        (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                    )
                })
        })
}

// Get users list
module.exports.getUserList = (req, res) => {
    User.find()
        .then(users => {
            return res.status(200).json(users)
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

// Delete account
module.exports.deleteAccount = (req, res) => {
    User.findByIdAndDelete(req.user.id)
        .then(response => {
            return res.status(200).json({message: "Deleted"})
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

// Delete all user
module.exports.deleteAll = (req, res, next) => {
    User.deleteMany()
      .then(res => {
        return res.status(200).json({ message: "Delete successfully" });
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  };
  
module.exports.deleteAllDriver = (req, res, next) => {
    Driver.deleteMany()
      .then(res => {
        return res.status(200).json({ message: "Delete successfully" });
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  };

// Update account
module.exports.updateAccount = (req, res) => {
    User.findById(req.user.id)
        .then( user => {
            if(!user) return res.status(400).json({error: "User doesnt exist"});

            const { fullName, DOB} = req.body;
            user.fullName = fullName;
            user.DOB = DOB;

            return user.save()            
        })
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

// Upload avatar
module.exports.uploadAvatar = (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            if(!user) return res.status(400).json({error: "User doesnt exist"});

            const regexPath = /(png|svg|jpg|jpeg)$/i;
            if(!regexPath.test(req.file.path)){
                return res.status.json({error: "Avatar must be image"});
            }
            user.avatar = req.file.path;
            return user.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => {
            return res.status(400).json(err);
        })
}

// Get user info
module.exports.getUserInfo = (req, res) => {
    const id = req.params.userId;
    User.findById(id)
        .then(user => {
            if(!user) return res.status(400).json({error: "User doesnt exist"});
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

// Change pw
module.exports.changePassword = (req, res) => {
    const userId = req.user.id;
    User.findById(userId)
        .then(user => {
            if(!user) return res.status(400).json({error: "User doesnt exist"});

            const {oldPassword, newPassword} = req.body;  

            bcrypt.compare(oldPassword, user.password) // so sánh password nhập vs password dc hash
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({password: 'Wrong password'});
                    
                    user.password = newPassword;
                    bcrypt.genSalt(10, (err, salt) => {
                        if(err) return res.status(400).json(err);
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if(err) return res.status(400).json(err);
                            user.password = hash;

                            user.save()
                                .then(user => {
                                    return res.status(200).json(user)
                                })
                                .catch(console.log)
                        })
                    })
                })                                  
        })
        .catch(err => res.status(400).json(err))
}

// Rate driver
module.exports.rateDriver = (req, res) => {
    const driverId = req.params.driverId;
    Driver.findOne({userId: driverId})
        .then(driver => {
            if(!driver) return res.status(400).json({error: "Driver not found"});

            const {raiting} = req.body;
            driver.passengerRates.push(raiting);
            return driver.save()
        })
        .then(driver => res.status(200).json(driver))
        .catch(err => res.status(400).json(err))
}


// Get user's history trip
module.exports.getUserHistoryTrip = (req, res) => {
    const userId = req.user.id;        
    Trip.find()
        .then(trips => {
            let userTripHistory = [];
            trips.map(trip => {
                trip.passengers.map(passenger => {
                    if(passenger.passengerId === userId)
                        userTripHistory.push(trip);
                })
            })
            return res.status(200).json(userTripHistory);
        })
        .catch(err => res.status(400).json(err))
}



























