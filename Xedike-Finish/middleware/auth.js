function authorizing (userType) {
    return (req, res, next) => {
        if(req.user.userType === userType){
            return next();
        }
        return res.status(400).json({error: "No permission"})
    }
}

module.exports = {authorizing};