const User = require("../models/user");
const Club = require("../models/club");


function joinClub(clubId, user) {
    console.log("clubId:", clubId);
    console.log("user:", user);
    return new Promise(async (resolve, reject) => {
        const club = await Club.findById(clubId);
        if (!club) {
            reject("Club not found");
        };
        club.members.push(user._id);
        user.clubs.push(club._id);
        await club.save();
        await user.save();
        resolve(club);
    });
};


module.exports = {
    joinClub: joinClub
};