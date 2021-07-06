const fs = require('fs');
const Discord = require('discord.js');
const mongodb = require('./connect.js');
const prefix = require(process.env.prefix);
const token = require(process.env.token);
const uri = require(process.env.uri);

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(token);
client.on('ready', () => {

  // connect to MongoDB
  mongodb.connect();

  console.log('RoninsHope GearBot est désormait en ligne');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

  if (!client.commands.has(command) || message.channel.type !== 'text') return;

  try {
  	client.commands.get(command).execute(message, args);
  } catch (error) {
  	console.error(error);
  	// message.reply('Il y a eu une erreur en écrivant la commande!');
  }
});

client.on('guildCreate', guild => {

	// create a new db when joining a new server
	console.log(`joined a guild id: ${guild.id}`);
	mongo.createNewDB(guild.id);
});
