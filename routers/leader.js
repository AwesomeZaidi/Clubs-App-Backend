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
const auth = require("../middleware/checkAuth");

leader.route('/event')
    // CREATE EVENT
    .post(auth.checkLeader, (req, res) => {
        controller.addEvent(req.body, req.user.leaderClub).then((event) => {
            return res.status(200).send({event});
        }).catch(error => {
            res.status(401).send(error);
        });
    }) 
    // DELETE EVENT
    .delete(auth.checkLeader, (req, res) => {
        const eventId = req.body.eventId;
        console.log('req.user:', req.user);
        console.log('eventId:', eventId);
        controller.removeEvent(eventId, req.user).then((club) => {
            return res.status(200).send('Event Deleted', {club});
        }).catch(error => {
            res.status(401).send(error);
        });
    });

// LEADER REQUESTS TO START A CLUB
leader.post('/requestClub', auth.checkLeader, (req, res) => {
    const user = req.user;
    console.log('req.body:', req.body);
    controller.requestClub(user, req.body).then((club) => {
        res.status(200).send({club});
    }).catch(err => {  
        res.status(401).send({err});        
    });
});

leader.get('/getClubLeaderClub', auth.checkAuth, (req, res) => {
    controller.getClubLeaderClub(req.user, req.user.leaderClub).then((club) => {
        res.status(200).send({club});
    }).catch(err => {
        res.status(401).send({err});
    });
});


module.exports = leader;
