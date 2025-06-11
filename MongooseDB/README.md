This directory contains one express servers:
* Server.js + App.js - Encapsulated Node/Express web server w/ Mongo Access

File content:
* App.ts - express server
* DB population files are stored on the createDB folder

Make sure you install the node.js server and Mongo DB sofware from the side.  Ensure your path variable contains the execution path of the node.js and mongo binary.

To execute the server db and then the node server with the following commands:

//create the db file directory
0. md db

//Starts the DB server on port 3000
1. start.EchoJournal.cmd

//populate the DB server with sample data
2. startdbClient.EchoJournal.cmd
load ('createDB/createEmotionEntrySampleData.js');
load ('createDB/createJournalEntrySampleData.js');
load ('createDB/createAffirmationSampleData.js');
load ('createDB/createSadEmotionEntrySampleData.js');
load ('createDB/createSadJournalEntrySampleData.js');
load ('createDB/createSadAffirmationSampleData.js');
load ('createDB/createAdminUser.js');
exit

//install npm packages
3. npm install

//Compile Node/Express Server.  You may need to go to all subdirectories and compile the ts files.
4. npm run build

//Execute Node/Express server on port 8080
5. npm run start

To test server #3, try the following URL on the browser, while the server is running:
* http://localhost:8080/
* http://localhost:8080/app/journal/{id_of_journal}/{user_id}
* http://localhost:8080/app/journal/all
