var React   = require('react');
var utils   = require('../utils');
var Link    = require('react-router').Link;
var Moment  = require('moment');

var ChirpBox = React.createClass({
    render: function(){
        var user = this.props.user;
        console.log('User is: ' + user);

        var timestamp = this.props.timestamp ?
                       '' + String.fromCharCode(8226) +
                       ''  + this.props.timestamp : '';

        var id = (typeof user.userId === 'number' ? user.userId : user.cid);

        return (
            <li className='row chirp'>
                <Link className='two columns' to='user' params={{id:id}}>
                    <img src={utils.avatar(user.email)} />
                </Link>
                <div className='ten columns'>
                    <p>
                        <Link to='user' params={{id:id}}>
                            <strong> {user.fullname} </strong>
                        </Link>
                        <span className='timestamp'>
                            @{user.username} {timestamp}
                        </span>
                    </p>
                    <p> {this.props.children} </p>
                </div>
            </li>
        );
    }
});

module.exports = ChirpBox;
