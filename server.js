var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8088;
var bodyParser = require('body-parser');
/*var morgan = require('morgan');
var bcrypt = require('bcryptjs');

var mongoose = require('mongoose');*/
var routes = require('./app/routes/api');

/*
var router = express.Router(); // Invoke the Express Router
var appRoutes = require('./app/routes/api')(router); // Import the application end points/API


app.use(morgan('dev'));
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public')); // Allow front end to access public folder
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/', routes);
//app.use('/api', appRoutes);

/*
mongoose.connect('mongodb://localhost/dmg-app', function(err) {
	if (err) {
		console.log('Not connected to the database: ' + err);
	} else {
		console.log('Successfully connected to MongoDB');
	}
});
*/

// Set Application Static Layout
app.get('*', function(req, res) {
    res.send(path.join(__dirname + '/public/index.html')); // Set index.html as layout
});

// Start Server
app.listen(port, function() {
	console.log('Now running the server on port ' + port);
});