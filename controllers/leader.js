
const Club = require("../models/club");
const Event = require("../models/event");


function addEvent(formData, leaderClub) {
    return new Promise(async (resolve, reject) => {
        const event = new Event(formData);
        const club = await Club.findById(leaderClub);           
        club.events.push(event);
        event.club = club._id;
        await event.save();
        await club.save();
        resolve(event);
    });
};

function removeEvent(eventId, user) {
    return new Promise(async (resolve, reject) => {
        const club = await Club.findById(user.leaderClub[0]);
        console.log('club:', club);
        club.events.remove(eventId);
        await Event.findByIdAndDelete(eventId);  
        club.save();
        resolve(club);
    });
};

function requestClub(user, clubData) {
    return new Promise(async (resolve, reject) => {
        let club = new Club(clubData);
        user.leaderClub ? user.leaderClub = [club._id] : user.leaderClub.push(club._id);
        user.requested = true;
        user.accepted = false;
        await user.save();
        club.leaders.push(user._id);
        await club.save();
        resolve(club);
    });
};

function getLeaderClub(leaderClubId) {
    return new Promise((resolve, reject) => {
        Club.findById(leaderClubId).then(club => {
            resolve(club);           
        }).catch((err) => {
            reject(err);
        });
    });
};

function editLeaderClub(leaderClubId, formData) {
    return new Promise((resolve, reject) => {
        Club.findById(leaderClubId).then(club => {
            club.set(formData).save();
            resolve(club);        
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    addEvent: addEvent,
    removeEvent: removeEvent,
    requestClub: requestClub,
    getLeaderClub: getLeaderClub,
    editLeaderClub: editLeaderClub,
};