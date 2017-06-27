var express = require('express');
var router = express.Router();
//var stripe = require("stripe")("sk_test_nxOdTTuECElaAjbh3svpG32m");
var stripe = require("stripe")("sk_live_qdyFazIVm5vTB2bThiOzbEVT");

//show the CRUD interface | GET
router.post('/api/charge', function(req, res){
    var token = req.body.token.id;
    var amount = req.body.amount;
    amount = amount * 100;
    console.log(req.body.token);
    console.log(token);
    console.log(amount);

    // Charge the user's card:
    var charge = stripe.charges.create({
      amount: amount,
      currency: "usd",
      description: "Example charge",
      source: token,
    }, function(err, charge) { // asynchronously called
        err ? res.json({success: false}) : res.json({success: true, charge: charge});
    });
});

module.exports = router;