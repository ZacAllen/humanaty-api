var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();


var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js

function createNewEvent(name, address, city, state, zip, date, time, meal, 
                        guest, description, allergy, additional) {
    console.log("createNewEvent called");
    //TESTING PURPOSES ONLY: DELETE WHEN SIGN IN HAS BEEN MERGED TO MASTER
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log("signed in anonymously");
          database.collection("events").doc(uid).set({
            name: name,
            address: address,
            city: city,
            state: state,
            zip: zip,
            date: date,
            time: time,
            meal: meal,
            guest:guest,
            description: description,
            allergy: allergy,
            additional: additional
        });
          // ...
        } else {
          // User is signed out.
          // ...
        }
        // ...
      });
}

router.post('/', function(req, res, next) {
  console.log("API working");
  createNewEvent(req.body.name, req.body.address, req.body.city, req.body.state,
                  req.body.zip, req.body.date, req.body.time, 
                  req.body.meal, req.body.guest, req.body.description,
                  req.body.allergy, req.body.additional); 
});

module.exports = router;