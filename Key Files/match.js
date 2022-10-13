/**************************************************************************
    Joel Chambers - 19166881 - CCSEP - Semester 2 - 2022
    Team 20 - ReDoS attack
    match.js: node.js file called by child process (where compute happens)
**************************************************************************/
//Function to handle compute for regex test
const match=()=>
{
	var text = process.argv[2];
	var regx = new RegExp(process.argv[3]); //Create regex from password
	var out = regx.test(text); //Test Username to see if a match for the regex is found
	return out;
};

//Starts match function after recieving message from parent
process.on('message', function(m)
{
	var out = match();
	process.send(out); //Send results
	process.exit(); //End child process
});
