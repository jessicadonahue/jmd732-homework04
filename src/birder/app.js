// birder

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set("view engine", "hbs");

//body parses creates a new property on ur request object 
// parsing for the properties in the body --> parsing for first name, last name
app.use(bodyParser.urlencoded({extended:false})); 

//Use the path module to create a path that specifies where
//static files are location
// bring in the path module
var path = require("path");
//create a cross-platform compatible path
var publicPath = path.resolve(__dirname, "public");
//use the built-in static files middleware to serve up any file
//in publicPath
app.use(express.static(publicPath));

var birdName = "";
//List of birds 
var birds = [{name: "Bald Eagle", num: 3}, {name: "Yellow Billed Duck", num: 7}, {name: "Great Cormorant", num: 4}];

//this sets up the form
app.get("/", function(req, res){

	res.render("home");
});

app.get("/birds", function(req, res){

	console.log(req.method + " " + req.path);
	console.log("=====");
	console.log(req.body);

	var minBirds = req.query.num;
	console.log("req.query.minVal: " + minBirds);
	console.log("");

	if (minBirds === undefined) {
		var context = {birds};
		res.render("birds", context);


	}
	else {
		var smallerBirds = birds.filter(function (smallerBirds) {
			return smallerBirds.num >= minBirds;
		});
		var context = {smallerBirds};
		res.render("birds2", context);
	}

});

// this handles the post 
app.post("/birds", function(req, res){
	


	birdName = req.body.name;

	console.log(req.method + " " + req.path);
	console.log("=====");
	console.log(req.body);
	console.log("");


	//search the current list of birds for entry with the same name 
	//if it exists add one to it 
	//if it doesnt, create an object for it, with quanity one, and add to list

	var found = birds.filter(function (found) {
		return found.name === birdName;
	});

	//if it isnt already in list
	if (found.length === 0) {
		var newBird = {name: birdName, num: 1};
		birds.push(newBird);
	}
	else {

		for (var i = 0; i < birds.length; i++) {
			if (birds[i].name === birdName) {
				birds[i].num++; 
			}
		}
	}

	res.redirect('/birds');
});




app.get("/settings", function(req, res){
	console.log(req.method + " " + req.path);
	console.log("=====");
	console.log(req.body);
	console.log("");


	res.render("settings");
});

app.listen(3000);

