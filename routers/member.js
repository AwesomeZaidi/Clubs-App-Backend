// member router </> member.js

const member = require('express').Router();
const controller = require('../controllers/member');
const auth = require("../middleware/checkAuth");

    // `club`
    // - `post` - join a club
    //         Args:               clubId
    //         Returns:            user object with club added to their list of clubs updated.

    //         Functionality:      `club`.post() requires a user and a clubId they want to join.
    //                             The controller finds the club and adds them to the list of members.
    //                             The club document reference is added to the users list of clubs.
    //                             Both objects are saved in our database with .save() notation.
    //                             The user object is returned.

    // TODO: When exactly is delete supposed to be used? In this scenario should i .delete or .put or .patch 
    //       Since we're updating and returning an object by removing a value from it.
    // - `delete` - leave a club
    //         Args:               clubId
    //         Returns:            user object with club added to their list of clubs updated.

    //         Functionality:      `club.delete() requires a user and a clubId they want to join.
    //                             The controller finds the club and adds them to the list of members.
    //                             The club document reference is added to the users list of clubs.
    //                             Both objects are saved in our database with .save() notation.
    //                             The user object is returned.


member.route('/club')
    // JOIN CLUB
    .post(auth.checkAuth, (req, res) => {
        controller.joinClub(req.body.clubId, req.user).then((club) => {
            return res.status(200).send({club});
        }).catch(error => {
            res.status(401).send(error);
        });
    })

    // LEAVE CLUB
    .patch(auth.checkAuth, (req, res) => {
        const clubId = req.body.clubId;
        controller.leaveClub(clubId, req.user).then(() => {
            return res.status(200).send('Successfully left club.');
        }).catch(error => {
            res.status(500).send(error);
        });
    });

    member.route('/event')
    // JOIN CLUB
    .post(auth.checkAuth, (req, res) => {
        controller.joinEvent(req.body.eventId, req.user).then((event) => {
            return res.status(200).send({event});
        }).catch(error => {
            res.status(401).send(error);
        });
    })

    // LEAVE CLUB
    .patch(auth.checkAuth, (req, res) => {
        controller.leaveClub(req.body.eventId, req.user).then(() => {
            return res.status(200).send('Successfully left club.');
        }).catch(error => {
            res.status(500).send(error);
        });
    });

module.exports = member;
