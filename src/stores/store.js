/*
* ----------------------------------------------------
* The store module serves as the prototype for the
* chirps and users store modules. These stores are
* used to store the data being used by the front-end
* of the application.
* ----------------------------------------------------
*/


var assign = require('object-assign');
var eventEmitterProto = require('events').EventEmitter.prototype;
var CHANGE_EVENT = 'CHANGE';

var storeMethods = {
    init: function(){},

    // Prevent duplicate items from being added to the data array
    set: function(arr){
        var currIds = this._data.map(function(m){return m.cid;});
        arr.filter(function(item){
            return currIds.indexOf(item.cid) === -1;
        }).forEach(this.add.bind(this));
        this.sort();
    },

    // Add items to the data array
    add: function(item){
        this._data.push(item);
        this.sort();
    },

    // Return all items in the data array
    all: function(){
        return this._data;
    },

    // Return only those items whose cids match the given id
    get: function(id){
        return this._data.filter(function(item){
            return item.cid === id;
        })[0];
    },

    // Sort the data array by the timestamp, with most recent first
    sort: function(){
        this._data.sort(function(a, b){
            return +new Date(b.$created) - +new Date(a.$created);
        });
    },

    /*
    * ----------------------------------------------------
    * The stores will be listening for events that occur
    * either in the user interface or the server, so that
    * they can update their data appropriately. It also
    * needs to be able to emmit changes that happen to it.
    * Therefore, other objects should be able to subscribe
    * to the stores' change events.
    * ----------------------------------------------------
    */

    // Register an event handler
    addChangeListener: function(fn){
        this.on(CHANGE_EVENT, fn);
    },
    RemoveChangeListener: function(fn){
        this.removeListener(CHANGE_EVENT, fn);
    },

    // Emmit changes to the store
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    // The bind function will take an action type and run an
    // action function when that action type occurs
    bind: function(actionType, actionFn){
        if(this.actions[actionType]){
            this.actions[actionType].push(actionFn);
        }
        else{
            this.actions[actionType] = [actionFn];
        }
    }
}

exports.extend = function(methods){
    var store = {
        _data: [],
        actions: {},
        mixin: {
            componentDidMount: function(){
                store.addChangeListener(this.onChange);
            },
            componentWillUnmount: function(){
                store.RemoveChangeListener(this.onChange);
            }
        }
    };
    assign(store, eventEmitterProto, storeMethods, methods);
    store.init();

    // Register each of the actions with the dispatcher
    require('../dispatcher').register(function(action){
        if (store.actions[action.actionType]){
            store.actions[action.actionType].forEach(function(fn){
                fn.call(store, action.data);
                store.emitChange();
            });
        }
    });

    return store;
};
