var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('../routes/firebase'); //get reference to firebase config file
var database = firebase.firestore(db.app); //declare database using app initialization in firebase.js
var eventCollection = database.collection("events"); //reference to the event collection of our database


//TODO: implement create event logic here
exports.createEvent = function(req, res, next) {
    res.send("implement create event here");  
}

exports.getEventsByCriteria = function(req, res, next) {
    //TODO: Uncomment these lines to authenticate user first. Check with Zach or Andrew
    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {

            let filter = '';
            let value = '';
            let eventList = []; 

            if (typeof req.query.city != 'undefined') {
                filter = 'location.city';
                value = req.query.city;
            } else if (typeof req.query.hostID != 'undefined') {
                filter = 'hostID';
                value = req.query.hostID;
            } else if (typeof req.query.title != 'undefined') {
                filter = 'title';
                value = req.query.title;
            }

            eventCollection.where(filter, '==', value)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let { id } = doc;
                        let data = doc.data();
                        console.log(data);
                        //this line manually add the id to the result object since Firebase data doesnt not include id.
                        let event = { id, ...data };

                        eventList.push(event)
                    })
                    res.send(eventList);        
                })               
                .catch(err => {
                    console.log('Error getting event data', err);
                });
          
    //     } else {
    //       console.log("No user logged in");  
    //       res.send("Error getting user data");
    //     }
    //  });
};


exports.getEventById = function(req, res, next) {

    //TODO: Uncomment these lines to authenticate user first. Check with Zach or Andrew
    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
            let uid = req.params.id;
            eventCollection.doc(uid)
                .get()
                .then( doc => {      
                    let { id } = doc;
                    let data = doc.data();

                    //this line manually add the id to the result object since Firebase data doesnt not include id.
                    let result = { id, ...data };

                    //return response
                    res.send(result);  
                })
                .catch(err => {
                    console.log('Error getting event data', err);
                });
          
    //     } else {
    //       console.log("No user logged in");  
    //       res.send("Error getting user data");
    //     }
    //  });
};