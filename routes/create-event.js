var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();


var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js

function createNewEvent(name, address, city, state, zip, date, time, meal, 
                        guest, description, allergy, additional) {

    database.collection("events").set({
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
    })
}

router.post('/', function(req, res, next) {
    createNewEvent(req.body.name, req.body.address, req.body.city, req.body.state,
                    req.body.zip, req.body.date, req.body.time, 
                    req.body.meal, req.body.guest, req.body.description,
                    req.body.allergy, req.body.additional); 
});