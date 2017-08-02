var React       = require('react');
var ChirpInput  = require('./ChirpInput');
var actions     = require('../actions');
var ChirpList   = require('./ChirpList');
var ChirpStore  = require('../stores/chirps');

var Home = React.createClass({
    getInitialState: function(){
        return {
            chirps: ChirpStore.timeline()
        };
    },
    componentDidMount: function(){
        ChirpStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        ChirpStore.addRemoveListener(this.onChange);
    },
    onChange: function(){
        this.setState(this.getInitialState());
    },
    render: function(){
        return (
            <div>
                <ChirpInput onSave={this.saveChirp} />
                <ChirpList chirps={this.state.chirps} />
            </div>
        );
    },
    saveChirp: function(text){
        actions.chirp(text);
    }
});

module.exports = Home;
