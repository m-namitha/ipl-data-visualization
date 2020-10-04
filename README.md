# ipl-data-visualization

csv_data: This directory contains the dataset: matches.csv and deliveries.csv ipl: This directory contains all your JavaScript business logic public: This directory is contains the resulting data.json and also the HTML and JavaScript code required to visualize the results. The static server serves the index.html file present in this directory index.js: This file contains the code which: 1. Reads the csv data 2. Calls the JavaScript business logic functions. 3. Saves the results in public/data.json
Visualize on: http://192.168.43.3:8085/
For this to work, you should have git and visual studio on your system installed. Then open your command peompt or gitbash, and type the commands
1.	Clone git repository
2.	npm install -npm init (have to name the package there) -npm install socket.io --save
3.	npm run ipl
4.	npm run start
Later you get links which shows the ipl data virtualization.

