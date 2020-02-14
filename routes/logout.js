var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();

var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js

//get request for user logged in status
router.get('/', function(req, res, next) {
   //sign user out
   firebase.auth().signOut().then(function() {
    res.send("Logged out!"); //the res.sends will be printed in front end console
   }, function(error) {
       console.error('sign out error', error);
       res.send("Logout error!");
   })
    
});

module.exports = router;