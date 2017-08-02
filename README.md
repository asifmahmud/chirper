# What is Chirper?

Chirper is a microblogging web app (similar to Twitter) where users can share their thoughts through "chirps". Users can follow other users and view their profiles as well. It is built with Flux application architecture along with React. 

# Installation
	git clone git@github.com:asifmahmud/chirper.git
	cd chirper

Chirper uses LocallyDB for data storage. Make sure to create a ".data" folder in the root directory.

	mkdir .data

Install necessary npm modules and build

	npm install
	gulp

Start the app by executing

	node server.js

The app can be accesed from localhost:3000
