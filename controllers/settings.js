const User = require("../models/user");
require('dotenv').config();

function updateSettings(data) {
    return new Promise(async (resolve, reject) => {
        let user = await User.findById(data._id);
        console.log("user found:", user);
        user.set('username', data.username).save();
        resolve(user);
    });
};

module.exports = {
    updateSettings: updateSettings
}