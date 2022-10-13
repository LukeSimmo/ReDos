/**************************************************************************
    Joel Chambers - 19166881 - CCSEP - Semester 2 - 2022
    Team 20 - ReDoS attack
    TimeoutServer.js: node.js server file patched to use 
    multithreading and timeout
**************************************************************************/
//express and body-parser simplify html form interaction
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cp = require('child_process');
const port = 3000; //Server to run on port 3000

app.use(bodyParser.urlencoded({ extended: true}));

//This section runs when the post request is recieved at /func
app.post("/func", (req, res) =>
{

	var text = req.body.text; //Username user input
	var pattern = req.body.pattern //Password user input
	var done = false;
	
	//Fork child process to compute withe the Username and Password passed as args
	var compute = cp.fork('match.js', [text,pattern]);

	console.time("timer"); //Timer for demonstration purposes
	compute.send('start'); //Send a message to child process to begin compute
	
	//This section triggers when the child process sends a message back to parent, in this case the result
	compute.on('message', out =>
	{
		done = true;
		console.timeEnd("timer");
		result = {out:out,text:text,pattern:pattern}; //Additional parameters included for demo purposes
		res.send(result); //Send result to the browser that send POST request
	});
	
	//Logging for when the child process exits on its own
	compute.on('exit', (code) => 
	{
		console.log(`child process exited with code ${code}`);
	});
	
	//Timeout function that kills the child process if it is still running after 5 seconds
	async function timeout()
	{
		await sleep(5000); //wait time in ms
		if(!done) //Check if the process is incomplete
		{
			console.log(`Timeout!`);
			process.kill(compute.pid, 'SIGINT'); //Kill child process
			res.send("Failed: Timeout"); //Send result to the browser that send POST request
		}
		return 1;
	};
	timeout();
	
});

//Basic function to allow something similar to wait() or sleep()
function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(port);
