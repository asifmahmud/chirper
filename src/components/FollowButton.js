var React       = require('react');
var actions     = require('../actions');
var UserStore   = require('../stores/users');
var Button      = require('react-button');

var FollowButton = module.exports = React.createClass({
    render: function(){
        if (this.state.id === this.props.userId)
            return <span> This is you! </span>;

        var text, action;
        if (this.state.currentlyFollowing.indexOf(this.props.userId) > -1){
            text = 'Unfollow';
            action = this.unfollow;
        }
        else{
            text = 'Follow';
            action = this.follow;
        }

        return <Button className='button' theme='' onClick={action}> {text} </Button>;

    },
    getInitialState: function(){
        return {
            currentlyFollowing: UserStore.currentUser.following,
            id: UserStore.currentUser.id
        };
    },
    componentDidMount: function(){
        UserStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        UserStore.removeChangeListener(this.onChange);
    },
    onChange: function(){
        this.setState(this.getInitialState());
    },
    unfollow: function(){
        actions.unfollow(this.props.userId);
    },
    follow: function(){
        actions.follow(this.props.userId);
    }
});
