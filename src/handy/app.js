// handy

var express = require('express');
var app = express();

//Use the path module to create a path that specifies where
//static files are location

// bring in the path module
var path = require("path");

//create a cross-platform compatible path
var publicPath = path.resolve(__dirname, "public");

//use the built-in static files middleware to serve up any file
//in publicPath
app.use(express.static(publicPath));



//sets the templating to handlebars 
app.set('view engine', 'hbs');

var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = [ "&hearts;", "&diams;", "&clubs;", "&spades;"];

function card(value, suit, color) {

	this.value = value;
	this.suit = suit;
	this.color = color;

}
//create a list of objects 
var cards = [];

//create deck of cards 
for (var i = 0; i < suits.length; i++) {

	for(var j = 0; j < values.length; j++) {

		if (suits[i] == "&hearts;" || suits[i] === "&diams;") {
			var color = "red";
		}
		else {
			var color = "black";
		}

		cards.push( new card(values[j], suits[i], color) );

	}
}

//console.log(cards);
//console.log(cards.length);

// /display is the template file and drops into layout
app.get("/hand", function(req, res){

	//we use templating bc then we dont have to handcode for 
	//every single user (nyu classes example)
	// so we need something partially static and dynamic 

	// (1) We already generated the deck of cards 

	// (2) Now we need to shuffle the deck of cards
	var theLength = cards.length - 1;
	var toSwap;
	var temp;

	for (i = theLength; i > 0; i--) {

		toSwap = Math.floor(Math.random() * i);
		temp = cards[i];
		cards[i] = cards[toSwap];
		cards[toSwap] = temp;
	}

	//control the number of cards sent back
	var num = req.query.cards;

	// (3) Now give 5 cards --> just give first 5 cards bc its already shuffled
	if (num !== undefined) {

		// if it isnt undefined but the query string is empty
		//so its length is 0 then give 5 cards 
		if (num.length === 0) {
			var give = cards.slice(0, 5);

		}
		else {
			//else the query exists and just use that number
			var give = cards.slice(0, num);

		}
		
	}
	else {

		//if we dont have a query strng just give 5 cards 
		var give = cards.slice(0, 5);

	}

	var context = {

		cards: give, 
	} 
	//you render the template and it gets dropped into the layout html
	res.render('display', context);
});

app.listen(3000);
