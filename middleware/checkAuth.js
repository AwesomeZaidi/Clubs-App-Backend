const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.cookies && req.cookies.nToken) {
        console.log("req.cookies", req.cookies)
        const uid = jwt.decode(req.cookies.nToken, process.env.SECRET)._id;
        User.findById(uid).then(user => {
            req.user = user;
            res.locals.authenticatedUser = user;
            return next();
        });
    } else {
        res.user = null;
        return next();
    }
}