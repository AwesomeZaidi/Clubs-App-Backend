
// USERS ROUTERS: contains all the routes needed for users and calls their functions using async/await.
// Dashboard : GET (move into its own file later)
// login : GET, POST
//  signup : GET, POS
//  logout : GET

const users = require('express').Router();
const controller = require('../controllers/user');

users.get('/', (req, res) => {
    res.render('index');
});

users.get('/dashboard', (req,res) => {  
    req.user ? res.render('dashboard') : res.redirect('/login');
});

users.get('/signup', (req,res) => {
    req.user ? res.redirect('/dashboard') : res.render('signup');
});

users.get('/login', (req,res) => {
    req.user ? res.redirect('/dashboard') : res.render('login');
});

users.post('/signup', (req,res) => {
    console.log("in signup route");
    console.log("req:", req.body);
    const body = req.body;
    controller.signUp(body).then(token => {
        console.log("token:", token);
        res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
        return res.status(200).send({token});
    }).catch(error => {
        res.status(401).send(error);
    });
});

users.post('/login', (req,res) => {
    const body = req.body;
    // const { username, password } = req.body;
    controller.logIn(body).then(token => {
        res.cookie("nToken", token, {maxAge: 900000, httpOnly:true});
        return res.status(200).send({token});
    }).catch(error => {
        return res.status(401).send({ error });
    });
});

users.get('/logout', (req,res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

module.exports = users;