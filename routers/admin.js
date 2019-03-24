
const admin = require('express').Router();
const controller = require('../controllers/admin');
const checkAuth = require("../middleware/checkAuth");

admin.get('/getAllClubsRequestingToJoin', checkAuth, (req, res) => {
    controller.getAllClubsRequestingToJoin(req.user).then((clubs) => {   
        res.status(200).send({clubs});
    }).catch(err => {
        res.status(401).send({err});
    }); 
});

admin.post('/acceptClub', checkAuth, (req, res) => {
    controller.acceptClub(req.body.clubId).then((clubs) => {
        // send an email to the club accepted and maybe even a text to the club leader 😆 ✅ 
        res.status(200).send({clubs});
    }).catch(err => {
        res.status(401).send({err});
    }); 
});

module.exports = admin;
