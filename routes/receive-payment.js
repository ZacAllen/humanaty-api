var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
var db = require('./firebase'); //get reference to firebase config file

var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_live_xIKmRktvuWZe8oauRwNbgAl900tlEhEydq');

router.post('/', function(req, res, next) {
  console.log("API working for payment page");
  createPaymentIntent(req.body.amount);
});

async function createPaymentIntent(amount) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
}

module.exports = router;