const Club = require("../models/club");
const Event = require("../models/event");


function joinClub(clubId, user) {
    return new Promise(async (resolve, reject) => {
        const club = await Club.findById(clubId);
        if (!club) {
            reject("Club not found");
        } else {
            club.members.push(user._id);
            user.clubs.push(club._id);
            await club.save();
            await user.save();
            resolve(club);
        };
    });
};

function leaveClub(clubId, user) {
    return new Promise(async (resolve, reject) => {
        const club = await Club.findById(clubId);
        if (!club) {
            reject();
        } else {
            club.members.remove(user._id);
            user.clubs.remove(clubId);
            await club.save();
            await user.save();
            resolve();
        };
    });
};

function joinEvent(eventId, user) {
    return new Promise(async (resolve, reject) => {
        const event = await Event.findById(eventId);
        if (!event) {
            reject("Club not found");
        } else {
            event.attendees.push(user._id);
            user.events.push(event._id);
            await event.save();
            await user.save();
            resolve(event);
        };
    });
};

function leaveEvent(eventId, user) {
    return new Promise(async (resolve, reject) => {
        const event = await Event.findById(eventId);
        if (!event) {
            reject();
        } else {
            event.members.remove(user._id);
            user.events.remove(eventId);
            await event.save();
            await user.save();
            resolve();
        };
    });
};

module.exports = {
    joinClub: joinClub,
    leaveClub: leaveClub,
    joinEvent: joinEvent,
    leaveEvent: leaveEvent
};