var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_live_3l44ZiszNPjf1kWnUH1YWDYQ");

//show the CRUD interface | GET
router.post('/api/charge', function(req, res){
    var token = req.body.token;
    var amount = req.body.amount;
    amount = amount.replace('.','');
    console.log(token);
    console.log(amount);
    // Charge the user's card:
    
    var charge = stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: "Example charge",
        source: token,
    }, function(err, charge) {
      // asynchronously called
        if (err) {
            console.log('Could not make charge');
            throw err;
            res.json({
                success: false, 
                message: 'Could not make charge'
            }); // Display any other error
        } else {
            res.json({
                success: true,
                message: 'Charge made'
            });
        }
    });//route add customer, get n post
});

module.exports = router;