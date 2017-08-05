/*
* ----------------------------------------------------
* Flux
* ----------------------------------------------------
* Flux is an application architecture, made by Facebook,
* that is used for building client-side web applications.
* More information can be found at:
* https://facebook.github.io/flux/
*/

var flux = require('flux');

// Inittiate the Flux dispatcher
var dispatcher = module.exports = new flux.Dispatcher();

dispatcher.register(function(action){
    console.log(action);
});
