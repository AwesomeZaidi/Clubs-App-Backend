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

menusRouter.route('/add')

    // POST
    .get((req, res), checkAuth => {
        const body = req.body;
        controller.add(body).then((event) => {
            return res.status(200).send({event});
        }).catch(error => {
            res.status(401).send(error);
        });
    });


module.exports = leader;
