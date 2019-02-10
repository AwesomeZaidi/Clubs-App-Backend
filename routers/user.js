// USERS ROUTERS: contains all the routes needed for users and calls their functions using async/await.
//  login : GET, POST
//  signup : GET, POST
//  logout : GET

const users = require('express').Router();

router.get('/login', (req,res) => {
    // login function
});

router.post('/login', (req,res) => {
    // login function
});

router.get('/signup', async (req,res) => {
    // signup function
});

router.post('/signup', async (req,res) => {
    // signup function
});

router.get('/logout', async (req,res) => {
    // logout function
});

module.exports = users;