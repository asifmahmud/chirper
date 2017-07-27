var router  = module.exports = require('express').Router();
var login   = require('./login');
var db      = new (require('locallydb'))('./.data');
var chirps  = db.collection('chirps');

function cleanUp(arr){
  var t = arr[2].replace('T', ':').split(':');
  arr.pop();
  arr = arr.concat(t);
  return arr;
}

function func(a, b){
  var str1 = cleanUp(a.$created.split('-'));
  var str2 = cleanUp(b.$created.split('-'));

  for (var i = 0; i < str1.length; i++){
    if (str1[i] < str2[i])
      return 1;
    else if (str1[i] > str2[i])
      return -1;
  }
  return 0;

};

router.route('/api/chirps')
    .all(login.required)
    .get(function(req, res){
        res.json(chirps.toArray().sort(func));
    })
    .post(function(req, res){
        var chirp = req.body;
        chirp.userId = req.user.cid;

        chirp.username = req.user.username;
        chirp.fullname = req.user.fullname;
        chirp.email    = req.user.email;

        var id = chirps.insert(chirp);
        res.json(chirps.get(id));
    });
