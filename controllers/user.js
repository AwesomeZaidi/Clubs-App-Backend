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

function requestClub(userData, clubData) {
    return new Promise(async (resolve, reject) => {
        let user = await User.findById(userData._id);
        if (user) {
            console.log("user found:", user);
            let club = new Club(clubData);
            console.log("club created:", club);
            user.clubs.push(club);
            console.log("user.clubs appended and saved:", user.clubs);
            user.requested = true;
            user.accepted = false;
            user.save();            
            console.log("user saved:", user);
            club.leaders.push(user)
            club.save();
            console.log("club leaders appened and saved:", club.leaders);
            resolve(user);
        } else {
            reject("User not found or something went wrong");
        };
    });
};

function getAllClubs(userData) {
    return new Promise(async (resolve, reject) => {
        let user = await User.findById(userData._id);
        if (user && user.type === 'admin') {
            console.log("user found:", user);
            Club.find().then(clubs => {
                console.log("clubs:", clubs);
                resolve(clubs);                
            });
        } else {
            reject("User not found or something went wrong");
        };
    });
};

function getClubLeaderClub(clubId, userId) {
    return new Promise(async (resolve, reject) => {
        let user = await User.findById(userId);
        if (user && user.type === 'leader') {
            console.log("user found:", user);
            Club.findById(clubId).then(club => {
                resolve(club);                
            });
        } else {
            reject("User or club not found or something went wrong");
        };
    });
};

module.exports = {
    signUp: signUp,
    logIn: logIn,
    requestClub: requestClub,
    getAllClubs: getAllClubs,
    getClubLeaderClub: getClubLeaderClub
};