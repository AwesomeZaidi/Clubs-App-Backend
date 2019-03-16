const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Club = require("../models/club");
const Event = require("../models/event");

function add(formData) {
    return new Promise(async (resolve, reject) => {
        let event = new Event(formData);
        console.log("event created:", event);
        user.clubs.push(club);
        console.log("user.clubs appended and saved:", user.clubs);
        user.requested = true;
        user.accepted = false;
        user.save();            
        console.log("user saved:", user);
        club.leaders.push(user)
        club.save();
        console.log("club leaders appened and saved:", club.leaders);
        resolve(user);
    });
};