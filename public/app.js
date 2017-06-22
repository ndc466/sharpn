var app = angular.module('app', [
    'ui.router',
    'angularPayments',
    'angularCSS',
    'angularMask'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    //Stripe.setPublishableKey('pk_live_bzoGgEuczvQGB2pPdGHjBSt5');

	$urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider 
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        css: 'css/grayscale.css'
    })
    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('who-we-are', {
        url: '/who-we-are',
        templateUrl: 'views/who-we-are.html',
        controller: 'aboutCtrl'    
    })
    .state('meet-the-team', {
        url: '/meet-the-team',
        templateUrl: 'views/meet-the-team.html',
        controller: 'teamCtrl'    
    })

    .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'views/contact-us.html',
        controller: 'contactCtrl'    
    })

    .state('give', {
        url: '/give',
        templateUrl: 'views/give.html',
        controller: 'giveCtrl',
        css: 'css/addon.css'
    });

});
