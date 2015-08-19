//Get the libs
var irc = require("tmi.js"); //Twitch API - Docs: http://www.tmijs.org/docs/

//Get the config
var config = require("./config.js");

//Define the bot
var bot = new irc.client(config);

//Connect to the Twitch server!
bot.connect();

//Let's do stuff!
bot.on("roomstate", function (channel, state) { //When connecting to a room

});

bot.on("chat", function (channel, user, message, self) { //When something is said
		
});