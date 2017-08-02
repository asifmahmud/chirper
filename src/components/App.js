var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navigation = require('./Navigation');

var App = React.createClass({
    render: function(){
        return (
            <div className='container'>
                <div className='header'>
                    <div className='row' >
                        <h1>Chirper</h1>
                    </div>
                    <div className='logo'> <img src="logo.jpg" className='logo'/></div>
                </div>
                <div className='row'>
                    <div className='three columns'>
                        <Navigation />
                    </div>
                    <div className='nine columns'>
                        <RouteHandler />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
