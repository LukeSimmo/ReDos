/**************************************************************************
    Joel Chambers - 19166881 - CCSEP - Semester 2 - 2022
    Team 20 - ReDoS attack
    NoRegexServer.js: node.js server file that doesn't
    allow regex manipulation
**************************************************************************/
//express and body-parser simplify html form interaction
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const port = 3000; //Server to run on port 3000

app.use(bodyParser.urlencoded({ extended: true}));

//This section runs when the post request is recieved at /func
app.post("/func", (req, res) =>
{

	console.time("timer"); //Timer for demonstration purposes
	var text = req.body.text; //Username user input
	var pattern = req.body.pattern //Password user input	
	var out = text.indexOf(pattern); //Using indexOf does not treat pattern as regex
	if(out == -1)
	{
		out = false;
	}
	else
	{
		out = true;
	}
	var result = {out:out,text:text,pattern:pattern}; //Additional parameters included for demo purposes
	res.send(result); //Send result to the browser that send POST request
	console.timeEnd("timer");
	
});

app.listen(port); //Base listening function on the specified port
