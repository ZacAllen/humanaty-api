var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();

var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js
var eventCollection = database.collection("events"); //reference to the events collection of our database

router.post('/', function(req, res, next) {

    console.log(req.body);
    let eventList = new Array(); 
    let city  = req.body.city;
    
    eventCollection.where("city", "==", city)
    .get()
    .then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          eventList.push(doc.data())
             
        })
        res.send(eventList);
   
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
})

module.exports = router;
