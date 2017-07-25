var React = require('react');
var ChirpInput = require('./ChirpInput');
var actions = require('../actions');
var Home = React.createClass({
    render: function(){
        return (
            <div>
                <ChirpInput onSave={this.saveChirp} />
            </div>
        );
    },
    saveChirp: function(text){
        actions.chirp(text);
    }
});

module.exports = Home;
