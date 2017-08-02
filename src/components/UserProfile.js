var React           = require('react');
var UserStore       = require('../stores/users');
var ChirpStore      = require('../stores/chirps');
var utils           = require('../utils');
var FollowButton    = require('./FollowButton');
var Box             = require('./ChirpBox');
var Moment          = require('moment');

var UserProfile = module.exports = React.createClass({
    getInitialState: function(){
        var id = parseInt(this.props.params.id);
        return {
            user: UserStore.get(id) || {},
            chirps: ChirpStore.byUserId(id)
        };
    },
    componentDidMount: function(){
        UserStore.addChangeListener(this.onChange);
        ChirpStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        UserStore.addChangeListener(this.onChange);
        ChirpStore.addChangeListener(this.onChange);
    },
    onChange: function(){
        this.setState(this.getInitialState());
    },
    render: function(){
        var chirps = this.state.chirps.map(function(chirp){
            return(
                <Box key={chirp.cid}
                     user={chirp}
                     timestamp={Moment(chirp.$created).fromNow()}>

                    {chirp.text}

                </Box>
            );
        });
        return (
            <div>
                <img className='two columns' src={utils.avatar(this.state.user.email)} />
                <div className='ten columns'>
                    <h1> {this.state.user.fullname} </h1>
                    <h3 className='timestamp'> @{this.state.user.username} </h3>
                    <p> <FollowButton userId={this.state.user.cid} /> </p>
                    <ul> {chirps} </ul>
                </div>
            </div>
        );
    }
});
