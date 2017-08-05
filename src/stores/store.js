var assign = require('object-assign');
var eventEmitterProto = require('events').EventEmitter.prototype;
var CHANGE_EVENT = 'CHANGE';

var storeMethods = {
    init: function(){},
    set: function(arr){
        var currIds = this._data.map(function(m){return m.cid;});
        arr.filter(function(item){
            return currIds.indexOf(item.cid) === -1;
        }).forEach(this.add.bind(this));

        this.sort();
        //console.log('Data Set');
        //console.log(this._data);
    },
    add: function(item){
        this._data.push(item);
        this.sort();
    },
    all: function(){
        return this._data;
    },
    get: function(id){
        //console.log(this._data);
        return this._data.filter(function(item){
            return item.cid === id;
        })[0];
    },
    sort: function(){
        this._data.sort(function(a, b){
            return +new Date(b.$created) - +new Date(a.$created);
        });
    },
    addChangeListener: function(fn){
        this.on(CHANGE_EVENT, fn);
    },
    RemoveChangeListener: function(fn){
        this.removeListener(CHANGE_EVENT, fn);
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
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
