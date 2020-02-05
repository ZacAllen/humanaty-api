var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();


var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js

function createNewUser(email, password, name, DOB) {
  /* firebase.auth.signout Will be deprecated in the future, just using this to prevent dupe sign ins until we have
  the view actually changing with the user's auth status */
  firebase.auth().signOut();

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        // User is signed in.
        //Now that user is created, find their ID
        var user = firebase.auth().currentUser;
        var uid = user.uid; 
        // Add a new document in collection "users" using this user's ID
        database.collection("users").doc(uid).set({
            Name: name,
            Email: email,
            DOB: DOB.toString(),
            isHost: false,
        })
        .then(function() {
            console.log("Document successfully written!");
            // window.location.assign("../../index.html");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        })
    }  else {
        // No user is signed in.
    }
  });
} 

//get user creation request
router.post('/', function(req, res, next) {
  console.log(req.body.email);
  createNewUser(req.body.email, req.body.password, req.body.name, req.body.DOB); 
});


module.exports = router;
