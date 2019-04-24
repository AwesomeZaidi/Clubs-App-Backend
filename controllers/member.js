const Club = require("../models/club");


function joinClub(clubId, user) {
    console.log("clubId:", clubId);
    console.log("user:", user);
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
    console.log('here');
    return new Promise(async (resolve, reject) => {
        console.log('heree');
        const club = await Club.findById(clubId);
        console.log('club:', club); 
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

module.exports = {
    joinClub: joinClub,
    leaveClub: leaveClub
};