var firebase = require('firebase');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();


var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js

const dbRef = firebase.database().ref("events");//declare database using app initialization in firebase.js

var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    const city = req.body.city
    var userReference = firebase.database().ref("/events/");

	//Attach an asynchronous callback to read the data
	userReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					userReference.off("value");
					}, 
			  function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					res.send("The read failed: " + errorObject.code);
			 });
});

const getEventsByCity = async (id) =>  {
    const doc = await database.doc('events').get()
    const data = doc.data()
    if (!data) {
      console.error('member does not exist')
      return
    }
    return data
  }


module.exports = router;