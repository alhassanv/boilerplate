const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
const config = require('./config.json');

client.config = config;

fs.readdir('./events/', async (err, files) => {
	if (err) return console.error(err);
	console.log('» » » » » » » » » Events » » » » » » » »');
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		console.log(`Loaded ${eventName}`);
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	console.log('» » » » » » » » » Commands » » » » » » » » »');

	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split('.')[0];
		if(props.config.aliases.length >= 0) console.log(`Loaded ${commandName}`);
		if(props.config.aliases.length >= 1) console.log(`Loaded ${commandName} | ${props.config.aliases.join(' | ')}`);
		client.commands.set(commandName, props);
		props.config.aliases.forEach(function(a) {client.commands.set(a, props);});
	});
});

fs.readdir('./handlers/', async (err, files) => {
	if(!files) return;
	if (err) return console.error(err);
	console.log('» » » » » » » » » Handlers » » » » » » » »');
	files.forEach(file => {
		const handler = require(`./handlers/${file}`);
		let handlerName = file.split('.')[0];
		if(handlerName.startsWith('event-')) {
			handlerName = handlerName.replace('event-', '');
			console.log('Loaded ' + handlerName);
			return client.on(handlerName, handler.bind(null, client));
		}

		console.log(`Loaded ${handlerName}`);
		handler.run(client);
	});
});


client.on('ready', async () => {
	console.log('» » » » » » » » » Start Up » » » » » » » » »');
	client.user.setActivity('with tickets', {
		type: 'PLAYING',
	});
	console.log(`Bot ${client.user.tag} is activated`);
	console.log(`Bot's invite link: https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
	console.log('» » » » » » » » » Listening » » » » » » » » »');
});

client.on('error', error => {
	console.error('The WebSocket encountered an error:', error);
});

client.login(config.token);
