
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

users.post('/requestClub', (req, res) => {
    console.log("in route");
    
    const data = req.body;
    const userData = data.userData;
    const clubData = data.clubData;
    console.log("body data:", data);
    controller.requestClub(userData, clubData).then((user) => {
        res.status(200).send({user});
    }).catch(err => {
        console.log("err:", err);
        res.status(401).send({err});        
    });
});

users.post('/getAllClubs', (req, res) => {
    console.log("in route");
    const data = req.body;
    controller.getAllClubs(data).then((clubs) => {
        console.log("clubss:", clubs);    
        res.status(200).send({clubs});
    }).catch(err => {
        console.log("err:", err);
        res.status(401).send({err});
    }); 
});

users.post('/getClubLeaderClub', (req, res) => {
    const clubId = req.body.clubId;
    const userId = req.body.userId;
    
    controller.getClubLeaderClub(clubId, userId).then((club) => {
        res.status(200).send({club});
    }).catch(err => {
        console.log("err:", err);
        res.status(401).send({err});
    });
});

module.exports = users;