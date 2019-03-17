
// USERS ROUTERS: contains all the routes needed for users and calls their functions using async/await.
// Dashboard : GET (move into its own file later)
// login : GET, POST
//  signup : GET, POS
//  logout : GET

const users = require('express').Router();
const controller = require('../controllers/user');
const checkAuth = require("../middleware/checkAuth");


users.post('/signup', (req,res) => {
    const body = req.body;
    controller.signUp(body).then((result) => {     
        const { token, user } = result;
        res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
        return res.status(200).send({user, token});
    }).catch(error => {
        res.status(401).send(error);
    });
});

users.post('/login', (req, res) => {
    const body = req.body;
    controller.logIn(body).then((result) => {
        const token = result.token;
        const user = result.user;  
        res.cookie("nToken", token, {maxAge: 900000, httpOnly:true});
        return res.status(200).send({user, token});
    }).catch(err => {
        return res.status(400).send({ err });
    });
});

users.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

users.get('/getAllClubs', checkAuth, (req, res) => {
    controller.getAllClubs(req.user).then((clubs) => {   
        res.status(200).send({clubs});
    }).catch(err => {
        res.status(401).send({err});
    }); 
});

module.exports = users;
