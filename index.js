// Setup dotenv so we can read the token and other environment variables from the .env file, and access them just like normal
require('dotenv').config()

// "import" the discordjs library and initialize a client, setup commands collection
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// "import" and setup funny logging stuff
const chalk = require('chalk');
const log = console.log;

// other setup(commands in different files) and imports
const fs = require('fs');
const { prefix } = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    log(chalk.yellowBright("Bot Ready!!"));
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// start the bot
client.login(process.env.TOKEN);