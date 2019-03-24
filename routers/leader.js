// GET /add
    // check if curr user is a club leader
    // render 'add' form

// POST /add
    // check if curr user is a club leader
    // find club leaders clubId to grab the specific club
        // create the event object
        // store the club obj ref doc into the clubs events
    // save

    // render confirmation page with data just posted

const leader = require('express').Router();
const controller = require('../controllers/leader');
const checkAuth = require("../middleware/checkAuth");

leader.route('/event')

    // GET EVENT
    .get((req, res) => {
        controller.getEvent(req.query.eventId).then((event, clubTitle) => {
            return res.status(200).send({event, clubTitle});
        }).catch(error => {
            res.status(401).send(error);
        });
    })
    // CREATE EVENT
    .post(checkAuth, (req, res) => {
        controller.addEvent(req.body, req.user.leaderClub).then((event) => {
            return res.status(200).send({event});
        }).catch(error => {
            res.status(401).send(error);
        });
    })

    // DELETE EVENT
    .delete(checkAuth, (req, res) => {
        const eventId = req.body.eventId;
        controller.removeEvent(eventId, req.user).then((club) => {
            return res.status(200).send({club});
        }).catch(error => {
            res.status(401).send(error);
        });
    });

// LEADER REQUESTS TO START A CLUB
leader.post('/requestClub', checkAuth, (req, res) => {
    const user = req.user;
    const clubData = req.body.clubData;
    controller.requestClub(user, clubData).then((user) => {
        res.status(200).send({user});
    }).catch(err => {  
        res.status(401).send({err});        
    });
});

leader.get('/getClubLeaderClub', checkAuth, (req, res) => {
    controller.getClubLeaderClub(req.user, req.user.leaderClub).then((club) => {
        res.status(200).send({club});
    }).catch(err => {
        res.status(401).send({err});
    });
});


module.exports = leader;
