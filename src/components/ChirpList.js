var React = require('react');
var Box = require('./ChirpBox');
var Moment = require('moment');
var UserStore = require('../stores/users');

var ChirpList = React.createClass({
    render: function(){
        var items = this.props.chirps.map(function(chirp){
            return(
                <Box key={chirp.cid}
                     user={chirp}
                     timestamp={Moment(chirp.$created).fromNow()}>

                    {chirp.text}

                </Box>
            );
        });
        return <ul> {items} </ul>;
    }
});

module.exports = ChirpList;
