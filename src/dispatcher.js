var flux = require('flux');

// Inittiate the Flux dispatcher
var dispatcher = module.exports = new flux.Dispatcher();

dispatcher.register(function(action){
    console.log(action);
});
