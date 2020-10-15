module.exports = async (client, message) => {
	const Discord = require('discord.js');
	if(message.partial) message.fetch();

	if (message.author.bot || !message.guild || !message.channel) return;

	if(message.content.indexOf(client.config.prefix) !== 0) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const cmd = client.commands.get(command);
	if (!cmd) return;

	cmd.run(client, message, args, Discord);

};