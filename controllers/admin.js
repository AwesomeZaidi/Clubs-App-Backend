const Club = require("../models/club");
const User = require("../models/user");

function getAllClubsRequestingToJoin(user) {
    return new Promise((resolve, reject) => {
        if (user.type === 'admin') {
        Club.find({accepted:false}).then(clubs => {
            resolve(clubs);                
        }).catch((err) => {
            console.log('error:', err);
            reject(err);
        });
        } else {
            reject("User not found or something went wrong");
        };
    });
};

function acceptClub(clubId) {
    return new Promise(async (resolve, reject) => {
        const club = await Club.findById(clubId);
        club.accepted = true;
        await club.save();
        const user = await User.findById(club.leaders[0]); // will have to refactor this later when seeing which leader to verify, that change will take place on the front end as well.
        user.accepted = true;
        await user.save();
        resolve(club)
    });
};

module.exports = {
    getAllClubsRequestingToJoin: getAllClubsRequestingToJoin,
    acceptClub: acceptClub
};