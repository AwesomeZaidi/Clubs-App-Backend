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

    // POST EVENT
    .post(checkAuth, (req, res) => {
        const body = req.body;
        controller.addEvent(body, req.user).then((club, event) => {
            return res.status(200).send({club, event});
        }).catch(error => {
            res.status(401).send(error);
        });
    })

    // DELETE EVENT - (almost done)
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
    const { clubData } = req.body;
    const user = req.user;
    controller.requestClub(user, clubData).then((user) => {
        res.status(200).send({user});
    }).catch(err => {
        res.status(401).send({err});        
    });
});

leader.post('/getClubLeaderClub', checkAuth, (req, res) => {
    controller.getClubLeaderClub().then((club) => {
        res.status(200).send({club});
    }).catch(err => {
        res.status(401).send({err});
    });
});


module.exports = leader;
