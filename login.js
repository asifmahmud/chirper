/* 
* ----------------------------------------------------
* Passport
* ----------------------------------------------------
* Passport is an authentication middleware for 
* Node.js. This app uses the Passport local 
* authentication strategy by storing user accounts
* locally.
* 
*/



var passport        = require('passport');
var localStrategy   = require('passport-local');
var locallyDB       = require('locallydb');
var crypto          = require('crypto');

// Creating a new locallyDB database instance and storing it in '.data' folder
var db = new locallyDB('./.data');

// Creating a new database collection named "users"
var users = db.collection('users');

// Creating a sha512 hash of the password by using the crypto library
function hash(password){
    return crypto.createHash('sha512').update(password).digest('hex');
}


/*
* ----------------------------------------------------
* Configure Passport to use the local strategy by 
* passing it a new localStrategy object. The callback
* function will be used to log the user into the system 
* if username and password match.
* ----------------------------------------------------
*/
passport.use(new localStrategy(function(username, password, done){
    var user = users.where({username: username, passwordHash: hash(password)}).items[0];
    
    if (user){
        done(null, user);
    }
    else{
        done(null, false);
    }
}));


/*
* ----------------------------------------------------
* serializeUser determines which data of the user 
* object should be stored in the session. In this case,
* it uses the user's cid.
* ----------------------------------------------------
*/ 
passport.serializeUser(function(user, done){
    done(null, user.cid);
})

// Convert the user back into a full object by using the cid
passport.deserializeUser(function(cid, done){
    done(null, users.get(cid));
})

var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(require('cookie-parser')());
router.use(require('express-session')({
    secret: 'hfyrye5463ufhsiudhf764y3ywhf253r93rghfyaehf6t3',
    resave: false,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/signup', function(req, res, next){
    if (users.where({username: req.body.username}).items.length === 0){
        var user = {
            fullname: req.body.fullname,
            email: req.body.email,
            username: req.body.username,
            passwordHash: hash(req.body.password),
            following: []
        };
        var userId = users.insert(user);
        req.login(users.get(userId), function(err){
            if (err) return next(err);
            res.redirect('/');
        })
    }
    else {
        res.redirect('/login');
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
})

function loginRequired(req, res, next){
    if (req.isAuthenticated()){
        //console.log('User is authenticated');
        next();
    }
    else{
        //console.log('User is not authenticated');
        res.redirect('/login');
    }
}

function makeUserSafe(user){
    var safeUser = {};
    var safeKeys = ['cid', 'fullname', 'email', 'username', 'following'];

    safeKeys.forEach(function(key){
        safeUser[key] = user[key];
    });
    return safeUser;
}

router.get('/api/users', function(req, res){
    res.json(users.toArray().map(makeUserSafe));
});

router.post('/api/follow/:id', function(req, res){
    var id = parseInt(req.params.id, 10);
    if (req.user.following.indexOf(id) < 0){
        req.user.following.push(id);
        users.update(req.user.cid, req.user);
    }
    res.json(makeUserSafe(req.user));
});

router.post('/api/unfollow/:id', function(req, res){
    var id = parseInt(req.params.id, 10);
    var index = req.user.following.indexOf(id);
    if (index > -1){
        req.user.following.splice(index, 1);
        users.update(req.user.cid, req.user);
    }
    res.json(makeUserSafe(req.user));
});

exports.routes = router;
exports.required = loginRequired;
exports.safe = makeUserSafe;
