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
                /* create object containing the user data we want, for now email, name, and status*/
                var obj = {name: data.Name, email: data.Email, isHost: data.isHost}
                res.send(obj) //send user data back to front end
            }));
          
        } else {
          console.log("no user logged in");  
          res.send("Error getting user data");
        }
     });
})

module.exports = router;