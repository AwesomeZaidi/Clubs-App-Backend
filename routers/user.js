// USERS ROUTERS: contains all the routes needed for users and calls their functions using async/await.
//  login : GET, POST
//  signup : GET, POST
//  logout : GET
const users = require('express').Router();
const controller = require('../controllers/user');
const checkAuth = require('../middleware/checkAuth');
const User = require('../models/user');

users.get(('/dashboard', '/', '/home'), (req,res) => {
    res.render('dashboard');
});

users.get('/login', (req,res) => {
    req.user ? res.redirect('/dashboard') : res.render('login');
});

users.post('/login', (req,res) => {
    const { username, password } = req.body;
    controller.logIn(username, password);
});

users.get('/signup', checkAuth, (req,res) => {
    res.render('/signup');
});

users.post('/signup', checkAuth, (req,res) => {
    const username = req.body.username;
    controller.signUp(username);
});

users.get('/logout', (req,res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

module.exports = users;