
const jwt = require('jsonwebtoken');
const User = require("../models/user");
require('dotenv').config();

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
        
        let user = await User.findOne({username}, "username type password");
        console.log("USER IN C:", user);
        
        // let user = await User.findOne({"username": username});
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
        // user.comparePassword.then((err, isMatch) => {
        //     console.log("user:", user);
        //     if (!isMatch) {
        //         reject('Wrong Username or password');
        //     };
        //     resolve(user);  
        // });
    });
};

// COULDN'T GET THIS TO WORK
// async function logIn(username, password) {
//     const user = await User.findOne({username}, "username password");
//     if(!user) {
//         throw('Wrong Username');
//     }
//     return user.comparePassword(password, (err, isMatch) => {
//         if (!isMatch) {
//             throw('Wrong Username or password');
//         };
//         const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, { expiresIn: "60 days" });
//         return token;      
//     }).catch(err => {
//         throw err;
//     });
// };

module.exports = {
    signUp: signUp,
    logIn: logIn
}