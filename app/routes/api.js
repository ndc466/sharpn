var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_live_qdyFazIVm5vTB2bThiOzbEVT");

//show the CRUD interface | GET
router.post('/api/charge', function(req, res){
    var token = req.body.token;
    var amount = req.body.amount;
    amount = amount * 100;
    console.log(token);
    console.log(amount);
    // Charge the user's card:
    
    // Create a new customer and then a new charge for that customer:
    stripe.customers.create({
      name: token.card.name,
      source: token.id
    })
    .then(function(customer){
        stripe.charges.create({
          amount,
          description: "Sample Charge",
             currency: "usd",
             customer: customer.id
        })
    })
    .then(function(charge) {
      // New charge created on a new customer
    })
    .catch(function(err) {
      // Deal with an error
    });

});

module.exports = router;