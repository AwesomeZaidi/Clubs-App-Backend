// member router <> member.js

const member = require('express').Router();
const controller = require('../controllers/member');
const checkAuth = require("../middleware/checkAuth");

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

    // JOIN EVENT
    .post(checkAuth, (req, res) => {
        controller.addEvent(req.body, req.user).then((club, event) => {
            return res.status(200).send({club, event});
        }).catch(error => {
            res.status(401).send(error);
        });
    })

    // LEAVE EVENT
    .delete(checkAuth, (req, res) => {
        const eventId = req.body.eventId;
        controller.removeEvent(eventId, req.user).then((club) => {
            return res.status(200).send({club});
        }).catch(error => {
            res.status(401).send(error);
        });
    });


module.exports = users;
