const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Club = require("../models/club");
const Event = require("../models/event");

function addEvent(formData, user) {
    return new Promise(async (resolve, reject) => {
        const event = new Event(formData);
        event.save();
        const club = await Club.findById(user.clubs[0]);           
        club.events.push(event);
        club.save();
        resolve(club, event);
    });
};

function removeEvent(eventId, user) {
    return new Promise(async (resolve, reject) => {
        const club = await Club.findById(user.clubs[0]);
        club.events.remove(eventId);
        await Event.findByIdAndDelete(eventId);  
        club.save();
        resolve(club);
    });
};

function requestClub(user, clubData) {
    return new Promise(async (resolve, reject) => {
        let club = new Club(clubData);
        user.clubs.push(club);
        user.requested = true;
        user.accepted = false;
        user.save();
        club.leaders.push(user)
        club.save();
        resolve(user);
    });
};

function getClubLeaderClub(clubId) {
    return new Promise((resolve, reject) => {
        if (user && user.type === 'leader') {
            Club.findById(user.clubs[0]._id).then(club => {
                resolve(club);                
            });
        } else {
            reject("User or club not found or something went wrong");
        };
    });
};

module.exports = {
    addEvent: addEvent,
    removeEvent: removeEvent,
    requestClub: requestClub,
    getClubLeaderClub: getClubLeaderClub,
};