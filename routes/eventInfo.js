var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();

var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js
var eventCollection = database.collection("events"); //reference to the events collection of our database

router.get('/', function(req, res, next) {


 var Items = new Array(); 
    // Is currently only sending first response. Getting Error
    //"Cannot set headers after they are sent to the client" when trying
    //to send second response
    eventCollection.get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          Items.push(doc.data())
          res.send(Items.pop());
      
  
        })
   
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
      //This is ideal. When a spefic location is searched, it will
      //send the array of all the items in that location. 
    //   for (i = 0; i < Items.length; i++) {
    //     res.send(Items.pop());
    //   }
 

})

module.exports = router;
