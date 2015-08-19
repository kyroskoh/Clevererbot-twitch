//Create the config var
var config = {
	options: {
		debug: true
	 },
	connection: {
		random: "chat",
		reconnect: true
	},
	identity: {
		username: "ExampleUsername",
		password: "oauth:abc123"
	},
	channels: ["#exampleusername"]
};

//Make the config var available when imported with require()
module.exports = config;