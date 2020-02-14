var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();

const dbRef = firebase.database().ref("events");//declare database using app initialization in firebase.js


var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.body);

  var temp = req.body;
  dbRef.on("value", snap => {
    console.log(snap); // this key will output users
    console.log(snap.key); // this method will return full user
  });
  //res.send(temp.city);
});


module.exports = router;