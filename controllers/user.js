
const jwt = require('jsonwebtoken');

const User = require("../models/user");

function logIn(username, password) {

    return new Promise((resolve, reject) => {
        User.findOne({
            username: username
        }, (err, user) => {
                if (err) {
                    reject(err);
                } else if (!user) {
                    reject('incorrect');
                } else {
                    User.comparePassword(password, user.password).then((match) => {
                        if (match) {
                            resolve(user);
                        } else {
                            reject('incorrect');
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                }
            });
        });
    }

    console.log("login controller");
    
    User.findOne({username}, "username password").then(user => {
        if(!user) {
            // User not found
            return res.status(401).send({ message: "Wrong Username" });
        }
        // check password
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                // Password does not match
                return res.status(401).send({ message: "Wrong Username or password" });
            }
            // Create a token
            const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, {
                expiresIn: "60 days"
            });
            // Set a cookie and redirect to root
            res.cookie("nToken", token, {maxAge: 900000, httpOnly:true});
            User.findById(user._id).then(user => {
                res.redirect('dashboard');
            })
            
        });
    })
    .catch(err => {
        console.log(err);
    });
}

function signUp(username) {
    User.findOne({username}, "username").then(user => {
        if(user) {
            return res.status(401).send({ message: "Account with this username already exists" });
        } else {
            const user = new User(req.body);
            // console.log("user:", user);
            SendGrid.sendWelcomeEmail(user);
            user.save().then((user) => {
                const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.SECRET, { expiresIn: "60 days" });
                // set the cookie when someone signs up and logs in
                res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
                res.redirect("/dashboard");
            }).catch(err => {
                console.log(err.message);
                return res.status(400).send({ err: err });
            });
        } // end else
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = {
    logIn: logIn,
    signUp: signUp
}