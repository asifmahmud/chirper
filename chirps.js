var router  = module.exports = require('express').Router();
var login   = require('./login');
var db      = new (require('locallydb'))('./.data');
var chirps  = db.collection('chirps');


router.route('/api/chirps')
    .all(login.required) // To view any part of the API, the user should be logged in
    
    .get(function(req, res){
        // Return all chirps from the chirps collection and send them to the user
        res.json(chirps.toArray());
    })

    // When users submit a chirp
    .post(function(req, res){
        
        var chirp = req.body; // Contains the text of the chirp
        
        // Add other properties to the chirp object
        chirp.userId = req.user.cid;
        chirp.username = req.user.username;
        chirp.fullname = req.user.fullname;
        chirp.email    = req.user.email;
        
        // Insert the chirp object to the chirps collection
        var id = chirps.insert(chirp);
        
        // Return the full chirp object
        res.json(chirps.get(id));
    
    });
