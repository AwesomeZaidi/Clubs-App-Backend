// // controllers/dashboard.js

// const User = require("../models/user");
// const Club = require("../models/club");// Find user

// function loadDashboard(userId) {
//     return new Promise(async (resolve, reject) => {
//         const user = await User.findById(userId);
//         if (!user) {
//             reject("User not found or something went wrong");
//         } else {
//             switch (user.type) {
//                 case 'member':
//                     break
//                 case 'leader'
//                     break
//                 case 'admin':
//                     break
//             }

//         };
//     });
// };
// // Check user type
//         // Load specific view 'member-dashboard'. 'admin-dashboard'

        
// module.exports = {
//     loadDashboard
// }