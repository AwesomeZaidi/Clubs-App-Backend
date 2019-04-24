const User = require('../models/user');
const jwt = require('jsonwebtoken');

function checkAuth (req, res, next) {
    if (req.cookies && req.cookies.nToken) {
        const uid = jwt.decode(req.cookies.nToken, process.env.SECRET)._id;
        User.findById(uid).then(user => {
            req.user = user;
            return next();
        });
    } else {
        return res.status(401).send("User not logged in");
    };
};

function checkLeader (req, res, next) {
    if (req.cookies && req.cookies.nToken) {
        const uid = jwt.decode(req.cookies.nToken, process.env.SECRET)._id;
        User.findById(uid).then(user => {
            req.user = user;
            if (req.user.type === 'leader') {
                console.log('leader authenticated.');
                
                return next();
            };
            return res.status(401).send("Leader user not found");
        }).catch((err) => {
            return res.status(500).send("Something went wrong, user not found.");
        });
    } else {
        return res.status(401).send("User not logged in");
    };
};

function checkAdmin (req, res, next) {
    if (req.cookies && req.cookies.nToken) {
        const uid = jwt.decode(req.cookies.nToken, process.env.SECRET)._id;
        User.findById(uid).then(user => {
            req.user = user;
            if (req.user.type === 'admin') {
                return next();
            };
            return res.status(401).send("Admin user not found");
        }).catch((err) => {
            return res.status(500).send("Something went wrong, user not found.");
        });
    } else {
        return res.status(401).send("User not logged in");
    };
};

module.exports = {
    checkAuth: checkAuth,
    checkAdmin: checkAdmin,
    checkLeader: checkLeader
};