var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();

var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js
var userCollection = database.collection("users"); //reference to the users collection of our database

router.get('/', function(req, res, next) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //User exists, get user id
            var uid = user.uid; 
            //Find specific user in the users collection based on their User ID
            if (userCollection.doc(uid).get().then(function(doc) {
                var data = doc.data(); //object containing data fields of this user
                if (data.isHost) { //if user is host
                    userCollection.doc(uid).update( { //change status to guest
                        isHost: false
                    }) 
                } else {
                    userCollection.doc(uid).update( {
                        isHost: true
                    }) 
                }
                
                res.send("status changed!")
            }));
          
        } else {
          console.log("no user logged in");  
          res.send("Error getting user data");
        }
     });
})

module.exports = router;