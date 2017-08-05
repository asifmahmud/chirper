/* 
* ----------------------------------------------------
* This module handles the actions received 
* from the view and dispatches them to the dispatcher
* ----------------------------------------------------
*/


var dispatcher = require('./dispatcher');
var constants  = require('./constants');

Object.keys(constants).forEach(function(key){
    var func = key.split('_').map(function(word, index){
        if (index == 0) return word.toLowerCase();
        return word[0] + word.slice(1).toLowerCase();
    }).join('');

    exports[func] = function(data){
        dispatcher.dispatch({
            actionType: constants[key],
            data: data
        });
    };
});
