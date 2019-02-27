
// USERS ROUTERS: contains all the routes needed for users and calls their functions using async/await.
// Dashboard : GET (move into its own file later)
// login : GET, POST
//  signup : GET, POS
//  logout : GET
const users = require('express').Router();
const controller = require('../controllers/user');

users.post('/signup', (req,res) => {
    const body = req.body;
    controller.signUp(body).then((result) => {     
        const token = result.token;
        const user = result.user;   
        res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
        return res.status(200).send({user, token});
    }).catch(error => {
        res.status(401).send(error);
    });
});

users.post('/login', (req,res) => {
    const body = req.body;
    controller.logIn(body).then((result) => {
        const token = result.token;
        const user = result.user;  
        res.cookie("nToken", token, {maxAge: 900000, httpOnly:true});
        console.log("user:", user);
        return res.status(200).send({user, token});
    }).catch(error => {
        console.log("error:", error);
        return res.status(400).send({ error });
    });
});

users.get('/logout', (req,res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

module.exports = users;