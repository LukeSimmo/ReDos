/**************************************************************************
    Joel Chambers - 19166881 - CCSEP - Semester 2 - 2022
    Team 20 - ReDoS attack
    readme.txt: Basic project info and directions
**************************************************************************/

Files:
index.html <- Webpage with user input form
BasicServer.js <- node.js server file for basic server operation
TimeoutServer.js <- node.js server file patched to use multithreading and timeout
NoRegexServer.js <- node.js server file that doesn't allow regex manipulation
match.js <- node.js file called by child process (where compute happens)

Preparation:
sudo apt install nodejs
sudo apt install npm
npm install express
npm install body-parser

Server setup (within folder, seperate terminals):
node <server>.js
python3 -m http.server

Use:
Browser - localhost:8000

Server attempts to match password (as regex) to username

User: myName123
Pass: myName
^ Would find match and would not be allowed (not implemented)

User: 123124343423432135415a
Pass: (\d+)+b
^ Evil regex causes long processing time and can be DoS depending on conmplexity/length

Patch options:
(IMPLEMENTED)
Timeout: Kill the process if it continues for too long
---> Use PatchedServer.js
Do not allow users to manipulate regex operations
---> User NoRegexServer.js
(NOT IMPLEMENTED)
Do not allow users to input/see both regex and text to be matched
Sanatize user input by escaping special characters before using in regex

