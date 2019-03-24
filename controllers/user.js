const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Club = require("../models/club");

function signUp(body) {
    return new Promise(async (resolve, reject) => {
        const username = body.username;
        let user = await User.findOne({username}, "username");
        if (user) {
            reject('Account with this username already exists');
        };
        let newUser = new User(body);
        newUser.save().then((newUser) => {
            const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, { expiresIn: "60 days" });
            resolve({user: newUser, token: token});
        }).catch(reject);
    });
};

function logIn(body) {
    return new Promise(async (resolve, reject) => {
        const { username, password } = body;
        // NOT SURE WHY THIS WOULDN'T WORK ...
        // let user = await User.findOne({username: username});
        let user = await User.findOne({username}, "username type clubs requested accepted password");
        if (!user) {
            reject('Wrong Username');
        };
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                reject('Wrong Username or Password');
            };
            const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, { expiresIn: "60 days" });
            resolve({user, token});   
        });
        // OLD CODE, REMOVE LATER BUT LIKE ANAALYZE IT MORE ALSO...
        // user.comparePassword.then((err, isMatch) => {
        //     console.log("user:", user);
        //     if (!isMatch) {
        //         reject('Wrong Username or password');
        //     };
        //     resolve(user);  
        // });
    });
};

function getAllClubs() {
    return new Promise((resolve, reject) => {
        Club.find({accepted:true}).then(clubs => {
            resolve(clubs);                
        });
    });
};

module.exports = {
    signUp: signUp,
    logIn: logIn,
    getAllClubs: getAllClubs
};