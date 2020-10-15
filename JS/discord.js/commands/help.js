exports.run = async (client, message, args, Discord) => {
	const fs = require('fs');

	const embed = new Discord.MessageEmbed()
		.setTitle('**HELP MENU**')
		.setColor(settings.color)
		.setFooter(message.guild.name, message.author.avatarURL)
		.setTimestamp();

	fs.readdir('./commands/', (async (err, files) => {
		if (err) return console.error(err);
		for (const file of files) {
			if (!file.endsWith('.js')) continue;
			const props = require(`../commands/${file}`);
			const commandName = file.split('.')[0];
			if(props.config.aliases.length == 0) embed.addField(client.config.prefix + commandName, props.config.description);
			if(props.config.aliases.length !== 0) embed.addField(client.config.prefix + commandName + ' | ' + props.config.aliases.join(' | '), props.config.description);
		}
		await message.channel.send(embed);
	}));


};

exports.config = {
	name: 'help',
	description: 'Help Command',
	aliases: [],
};
