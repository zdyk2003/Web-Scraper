//dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var mongojs	= require('mongojs');
var request = require('request'); 
var cheerio = require('cheerio'); 

// mongoose.Promise= Promise;

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("public"));

// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Import Routes/Controller
var router = require("./controllers/controllers.js");
app.use("/", router);

// Connect to localhost if not a production environment
if(process.env.NODE_ENV == 'production'){
	mongoose.connect('');
}
else{
	mongoose.connect("mongodb://localhost/webScraper");
}

// Database config with mongoose
var db = mongoose.connection;
	// Show any mongoose errors
	db.on("error", function(error) {
	  console.log("Mongoose Error: ", error);
	});
	// Once logged in to the db through mongoose, log a success message
	db.once("open", function() {
	  console.log("Mongoose connection successful.");
	});


//port
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});