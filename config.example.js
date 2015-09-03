//Create the config var
var config = {
	twitch: {
		options: {
			debug: true
		 },
		connection: {
			random: "chat",
			reconnect: true
		},
		identity: {
			username: "TwitchUsername",
			password: "oauth:abc123"
		},
		channels: ["#TwitchUsername"]
	},
	cleverbotIO: {
		apiUser: "abc123",
		apiKey: "abc123abc123"
	},
	chatbot: {
		triggers: {
			directMention: true,
			randomResponseChance: 3
		},
		options: {
			useNamedResponse: false,
			fullMoonCrazy: false
		}
	}
};

//Make the config var available when imported with require()
module.exports = config;