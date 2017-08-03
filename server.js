/*
* ----------------------------------------------------
* Express
* ----------------------------------------------------
* Express is a web application framework for Node.js.
* It is used to handle server-side operations, routing,
* browser sessions etc. For more information, visit:
* https://github.com/expressjs/express
*
*/

var express = require('express');
var login   = require('./login');
var chirps  = require('./chirps');

express()
    /*
    * ----------------------------------------------------
    * Set the view engine to ejs, to let Express know to
    * use the ejs templating system
    * ----------------------------------------------------
    */
    .set('view engine', 'ejs') /
    .use(express.static('./public'))
    .use(login.routes)
    .use(chirps)
    /*
    * ----------------------------------------------------
    * For any non-static requests, express first checks if
    * the user is logged in, by calling login.required.
    * When the user is authenticated, it sends the index
    * template.
    * ----------------------------------------------------
    */
    .get('*', login.required, function(req, res){
        res.render('index', {
            user: login.safe(req.user)
        });
    })
    .listen(3000);
