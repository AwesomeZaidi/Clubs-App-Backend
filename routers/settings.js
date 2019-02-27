
// SETTING ROUTER: contains all the routes needed for member to view and edit their settings.
// /settings : GET
// /settings : PUT


const settings = require('express').Router();
// const User = require("../models/user");
const controller = require('../controllers/settings');

/* edit settings */
settings.put('/settings', (req, res) => {
    const data = req.body;
    const userFormState = data.userFormState;
    // here i need to grab the form data to pass into the updateSettings controller 
    if (data.token) {
        controller.updateSettings(userFormState).then(user => {
            return res.status(200).send({user});
        }).catch(console.err);
    } else {
        return res.status(400).send('Something went wrong.');
    };
});

module.exports = settings;