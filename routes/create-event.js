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
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
  
          let uid = user.uid;
          var newEventRef = database.collection("events").doc();
          console.log(newEventId);
          var newEventId = newEventRef.id;
          console.log("signed in anonymously");

          database.collection("users").doc(uid).update({ 
            //update eventshosting field in this user's array
              eventsHosting:   firebase.firestore.FieldValue.arrayUnion(newEventId) 
              //this appends the event's id to the array field
              //STILL TO BE DONE: this needs to be handled with a promise or catch block
          });
          let setDoc = database.collection("events").doc(newEventId).set({
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
        return setDoc.then(function() {
          console.log("Document successfully written for event!");
        });
  
        } else {
          // User is signed out.
          // ...
        }
    
      }); 
}

router.post('/', function(req, res, next) {
  console.log("API working for event page");
  createNewEvent(req.body.name, req.body.address, req.body.city, req.body.state,
                  req.body.zip, req.body.date, req.body.time, 
                  req.body.meal, req.body.guest, req.body.description,
                  req.body.allergy, req.body.additional); 
});

module.exports = router;