
const admin = require('express').Router();
const controller = require('../controllers/admin');
const auth = require("../middleware/checkAuth");

admin.get('/getAllClubsRequestingToJoin', auth.checkAdmin, (req, res) => {
    controller.getAllClubsRequestingToJoin(req.user).then((clubs) => {   
        res.status(200).send({clubs});
    }).catch(err => {
        res.status(401).send({err});
    }); 
});

admin.post('/acceptClub', auth.checkAdmin, (req, res) => {
    controller.acceptClub(req.body.clubId).then(() => {
        // send an email to the club accepted and maybe even a text to the club leader 😆 ✅ 
        res.status(200).send('Club Accepted Successfully.');
    }).catch(err => {
        res.status(401).send({err});
    }); 
});

// Implement denyClub route where we send email to leader and delete club from db.

module.exports = admin;
