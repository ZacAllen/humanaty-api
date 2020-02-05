var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');

var express = require('express');
var router = express.Router();


function createNewUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });
}

//get user creation request
router.post('/', function(req, res, next) {
  console.log(req.body.email);
  createNewUser(req.body.email, req.body.password); 
});


module.exports = router;
