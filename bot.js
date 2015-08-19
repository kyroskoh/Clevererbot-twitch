//Get the libs
var irc = require("tmi.js"); //Twitch API - Docs: http://www.tmijs.org/docs/
var cleverbotIO = require("cleverbot.io"); //CleverbotIO API - Docs: https://docs.cleverbot.io/v1.0/docs
require("prototypes"); //Adds a bunch prototype JS functions e.g. string.startsWith();

//Get the config
var config = require("./config.js");

//Setup the twitch chatbot
var chatbot = new irc.client(config.twitch);
chatbot.connect(); //Connect to Twitch

//Setup the cleverbotIO API bot
cleverbot = new cleverbotIO(config.cleverbotIO.apiUser, config.cleverbotIO.apiKey);
cleverbot.create(function (err, session) { //Create the session
	if (err) { //if there was an error creating the session
		console.log("Error creating cleverbotIO session: " + err + " | " + "session: " + session);
	} else {
		console.log("cleverbotIO session created: " + session);
		cleverbot.setNick(session);
	}
}); 

//Event Listeners
//When connecting to a channel
chatbot.on("roomstate", function (channel, state) { 
	chatbot.action(channel, "has connected.");
});

//When something is said
chatbot.on("chat", function (channel, user, message, self) { 
	var shouldRespond = false; //Default to not responding
	
	//Do different checks to see if ClevererBot should say something
	if (directlyMentioned(message)) { //Check if someone said "ClevererBot, " at the start
		shouldRespond = true;
		console.log("directlyMentioned() responded true");
	} else if (randomlyRespond()) { //Check whether to randomly respond to someone
		shouldRespond = true;
		console.log("randomlyRespond() responded true");
	}
	
	//Time to make a response!
	if (shouldRespond == true) { //if any of the above checks responded yes
		console.log("Asking cleverbotIO API");
		cleverbot.ask(message, function (err, response) { //ask the cleverbotIO API
			if (err) { //if there's an error
				console.log("Error asking cleverbotIO: " + err + " | " + "response: " + response);
			} else { //if the response is a success
				chatbot.say(channel, response);
			}
		});
	}
});

//Functions
//Check if ClevererBot was mentioned at the start
function directlyMentioned(message) {
	//Check the config whether to do this check
	if (typeof(config.chatbot.triggers.directMention) !== "boolean") { 
		return false; //if directMention isn't a boolean, it's set wrong
	} else if (!(config.chatbot.triggers.directMention)) {
		return false; //if directMention is set to false
	}
	
	var messageCheck = message.toUpperCase(); //Make it case insensitive
	var nameCheck = config.twitch.identity.username.toUpperCase() + ", "; //e.g. "CLEVERERBOT, "
	
	//console.log("StartsWith(): " + messageCheck.startsWith(nameCheck));
	if (messageCheck.startsWith(nameCheck)) {
		//console.log("Detected a direct mention!");
		return true;
	} else {
		return false;
	}
};

//Check whether to randomly respond
function randomlyRespond() {
	//Check if the config declares the option
	if (typeof(config.chatbot.triggers.randomResponseChance) !== "number") { 
		return false; //if config value isn't a number, it's set wrong
	} else if (config.chatbot.triggers.randomResponseChance < 0 || config.chatbot.triggers.randomResponseChance > 100) {
		return false; //if config value isn't between 0 and 100, it's set wrong
	}
	
	var randomChance = config.chatbot.triggers.randomResponseChance; //Percentage chance to randomly respond
	var diceRoll = Math.floor(Math.random() * 100) + 1; //Get a number between 1 and 100
	
	if (diceRoll <= randomChance) {
		return true;
	} else {
		return false;
	}
};