var React           = require('react');
var reactRouter     = require('react-router');
var Route           = reactRouter.Route;
var API             = require('./api');

// Contains the various routes used throughout the app
var routes = (
    <Route handler={require('./components/App')}>
        <Route name='home' path='/' handler={require('./components/home')} />
        <Route name='users' handler={require('./components/UserList')} />
        <Route name='user' path='/user/:id' handler={require('./components/UserProfile')} />
    </Route>
);

API.startFetchingChirps();
API.startFetchingUsers();


reactRouter.run(routes, reactRouter.HistoryLocation, function(Root){
    React.render(<Root />, document.getElementById('app'));
});
