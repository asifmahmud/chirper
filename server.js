var express = require('express');
var login   = require('./login');
var chirps  = require('./chirps');

express()
    .set('view engine', 'ejs')
    .use(express.static('./public'))
    .use(login.routes)
    .use(chirps)
    .get('*', login.required, function(req, res){
        res.render('index', {
            user: login.safe(req.user)
        });
    })
    .listen(3000);
