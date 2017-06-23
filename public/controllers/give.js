var app = angular.module('app')
.controller('giveCtrl', function ($scope, $http) {

    $scope.amount;
    $scope.params = {}

    var stripe = Stripe('pk_live_bzoGgEuczvQGB2pPdGHjBSt5');
    var elements = stripe.elements();

    var card = elements.create('card', {
        hidePostalCode: true,
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: 'Helvetica Neue',
                fontSize: '15px',
                '::placeholder': {
                    color: '#CFD7E0',
                },
            },
        }
    });
    card.mount('#card-element');

    function setOutcome(result) {
        var successElement = document.querySelector('.success');
        var errorElement = document.querySelector('.error');
        successElement.classList.remove('visible');
        errorElement.classList.remove('visible');

        if (result.token && $scope.amount > 0) {
            // Use the token to create a charge or a customer
            // https://stripe.com/docs/charges
            successElement.querySelector('.token').textContent = result.token.id;
            successElement.classList.add('visible');
            console.log(result.token);
            $scope.params.token = result.token;
            $scope.params.amount = $scope.amount;
            $http.post('/api/charge', $scope.params).then(function(res) {
                res.data.success ? console.log("Charge successful") : console.log("Charge unsuccessful");
            });
        } else if (result.error) {
            errorElement.textContent = result.error.message;
            errorElement.classList.add('visible');
            console.log("Failure");
        }
    }

    card.on('change', function(event) {
        setOutcome(event);
    });

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        var form = document.querySelector('form');
        var extraDetails = {
            name: form.querySelector('input[name=cardholder-name]').value,
        };
        stripe.createToken(card, extraDetails).then(setOutcome);
    });
});