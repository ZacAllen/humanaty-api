var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var database = firebase.firestore(db.app);
var events = database.collection('events');

var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_live_xIKmRktvuWZe8oauRwNbgAl900tlEhEydq');

async function createPaymentIntent(id, amount, guest_num) {
  router.get('/', function(req, res, next) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let event_id = id;
        if (events.doc(event_id).get().then((doc) => {
          var data = doc.data()
          var event_cost = data.cost
          if (guest_num * event_cost == amount) {
            const paymentIntent = await stripe.paymentIntents.create({
              amount: amount,
              currency: 'usd',
              metadata: {integration_check: 'accept_a_payment'},
            });
            res.send(paymentIntent.client_secret)
          }
        }));
      }
    });
  });
}

router.post('/', function(req, res, next) {
  console.log("API working for payment page");
  createPaymentIntent(req.body.id, req.body.amount, req.body.guest_num);
});

module.exports = router;