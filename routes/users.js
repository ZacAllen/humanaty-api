var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Probably move firebase config to its own file later
const config = {
  apiKey: "AIzaSyAWCy8z8DwxRv2sG4VTBcEHwvQ3Jo2ZTsc",
  authDomain: "humanaty-gatech.firebaseapp.com",
  databaseURL: "https://humanaty-gatech.firebaseio.com",
  projectId: "humanaty-gatech",
  storageBucket: "humanaty-gatech.appspot.com",
  messagingSenderId: "129035646582",
  appId: "1:129035646582:web:9325ea45722f3f316a9157",
  measurementId: "G-L36MZZX0QE"
};

//Initialize firebase
var app = firebase.initializeApp(config);
//Declare our firestore database
var database = firebase.firestore(app);



module.exports = router;
