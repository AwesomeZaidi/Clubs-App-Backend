const User = require('../models/user');
const jwt = require('jsonwebtoken');

function getUser (req, res, next) {
    return new Promise((resolve, reject) => {
        if (req.cookies && req.cookies.nToken) {
            const uid = jwt.decode(req.cookies.nToken, process.env.SECRET)._id;
            User.findById(uid).then(user => {                
                req.user = user;
                resolve(user);
            });
        } else {
            reject("User not logged in");
        };
    });
};

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

async function checkLeader (req, res, next) {
    // const user = await getUser(req, res);
    // if (user.type === 'leader') {
    //     return next();
    // } else {
    //     return res.status(500).send("Something went wrong, user not found, please relogin.");
    // };
    getUser(req, res).then((user) => {
        return next();
    }).catch(err => {  
        return res.status(500).send("Something went wrong, user not found, please relogin.");       
    });
};

async function checkAdmin (req, res, next) {
    const user = await getUser(req, res);
    if (user.type === 'admin') {
        return next();
    } else {
        return res.status(500).send("Something went wrong, user not found, please relogin.");
    };
};

module.exports = {
    checkAuth: checkAuth,
    checkAdmin: checkAdmin,
    checkLeader: checkLeader
};