/*
* ----------------------------------------------------
* Extends the store module to handle actions specific
* to chirps.
* ----------------------------------------------------
*/



var constants = require('../constants');
var UserStore = require('./users');

var ChirpStore = module.exports = require('./store').extend({

    init: function(){
        /*
        * ----------------------------------------------------
        * Whenever new chirps enter the system, coming from
        * the server, the GOT_CHIRPS action will occur. The
        * chirps store will be listening and call the "set"
        * function.
        *
        * Similarly, Whenever the user creates a chirp, the
        * CHIRPED action will occur. The chirps store will
        * add that chirp to the store. 
        * ----------------------------------------------------
        */
        this.bind(constants.GOT_CHIRPS, this.set);
        this.bind(constants.CHIRPED, this.add);
    },
    timeline: function(){
        var ids = [UserStore.currentUser.cid].concat(UserStore.currentUser.following);
        return this._data.filter(function(chirp){
            return ids.indexOf(chirp.userId) > -1;
        });
    },
    byUserId: function(id){
        return this._data.filter(function(chirp){
            return id === chirp.userId;
        });
    }
});
