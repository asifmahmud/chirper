var React           = require('react');
var reactRouter     = require('react-router');
var Route           = reactRouter.Route;
var API             = require('./api');
var chirpStore      = require('./stores/chirps');

var routes = (
    <Route handler={require('./components/App')}>
        <Route name='home' path='/' handler={require('./components/home')} />
    </Route>
);


API.fetchChirps();

reactRouter.run(routes, reactRouter.HistoryLocation, function(Root){
    React.render(<Root />, document.getElementById('app'));
});
