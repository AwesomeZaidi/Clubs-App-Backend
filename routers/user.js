
// USERS ROUTERS: contains all the routes needed for users and calls their functions using async/await.
// Dashboard : GET (move into its own file later)
// login : GET, POST
//  signup : GET, POS
//  logout : GET

const users = require('express').Router();
const controller = require('../controllers/user');

users.post('/signup', (req,res) => {
    const body = req.body;
    controller.signUp(body).then((result) => {     
        const { token, user } = result;
        res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
        return res.status(200).send({user});
    }).catch(error => {
        res.status(401).send(error);
    });
});

users.post('/login', (req, res) => {
    const body = req.body;
    controller.logIn(body).then((result) => {
        const token = result.token;
        const user = result.user;  
        res.cookie("nToken", token, {maxAge: 900000, httpOnly:true});
        return res.status(200).send({user});
    }).catch(err => {
        console.log("err:", err);        
        return res.status(400).send({ err });
    });
});

users.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    return res.status(200).send('User logged out.');
});

users.get('/getAllClubs', (req, res) => {
    controller.getAllClubs().then((clubs) => {   
        res.status(200).send({clubs});
    }).catch(err => {
        res.status(400).send({err});
    }); 
});

// CREATE EVENT
users.get('/event/:id', (req, res) => {
    controller.getEvent(req.body.eventId).then((eventAndclub) => {
        console.log('clubAndEvent:', clubAndEvent);
        
        return res.status(200).send({event: eventAndClub[1], club: eventAndClub[0]});
    }).catch(error => {
        res.status(401).send(error);
    });
})

users.get((req, res) => {
    controller.getEvent(req.query.eventId).then((event, clubTitle) => {
        return res.status(200).send({event, clubTitle});
    }).catch(error => {
        res.status(401).send(error);
    });
});

module.exports = users;
