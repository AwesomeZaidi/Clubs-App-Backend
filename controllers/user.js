
const jwt = require('jsonwebtoken');
const User = require("../models/user");
require('dotenv').config();

async function signUp(body) {
    // return new Promise((resolve, reject) => {
    const username = body.username;
    const user = await User.findOne({username}, "username");
    // User.findOne({username}, "username").then(user => {
        if(user) {
            // return res.status(401).send({ message: "Account with this username already exists" });
            // reject();
            throw('Account with this username already exists');
        } else {
            const user = new User(body);
            console.log("user:", user);
            
            user.save().then((user) => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
                // set the cookie when someone signs up and logs in
                // res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
                // res.redirect("/dashboard");
                // resolve(token);
                return(token);
            }).catch(err => {
                console.log(err.message);
                // reject(err.message);
                throw err;

            });
        } // end else
    // }).catch((err) => {
    //     console.log(err);
    //     // reject(err.message);
    //     throw err;
    // });
};

module.exports = {
    signUp: signUp
}