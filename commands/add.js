const Discord = require('discord.js');
const { mongo } = require("../connect");
const classes = require("../classes.json");
const { prefix } = require("../config.json");


async function add(message, args) {

  let date = new Date().toDateString();

  let gs;

  args[0] >= args[1] ? gs = args[0] + args[2] : gs = args[1] + args[2];

  let gear = {
    "discordID": message.author.id,
    "ap": args[0],
    "aap": args[1],
    "dp": args[2],
    "level": args[3],
    "character": args[4],
    "family": args[5],
    "class": args[6],
    "gearscore": gs,
    "lastUpdated": date
  };

  try{
    const guild = message.guild.id;
    const db = mongo.db('RoninsGearBot');
    const col = db.collection(guild);

    const p = await col.findOne({discordID: message.author.id});

    if(p !== null) {
      message.channel.send('Ton équipement est déjà enregistré!');
      return;
    }

    await col.insertOne(gear);
    message.channel.send('Équipement ajouté.');

  } catch(err) {
    console.log(err.stack);
    message.channel.send('Erreur');
  } finally {
  }

  // const p = await
}

module.exports = {
  name: 'add',
  description: 'Ajoute ton équipement.',
  execute: function(message, args) {

    const usageMsg = `${prefix}add <ap> <aap> <dp> <level> <Character> <Family> <class> (without brackets)`

    if(args.length < 7) {
      message.channel.send(usageMsg);
      return;
    }

    if(args[7]) {
      args[6] += ` ${args[7]}`;
    }

    args[6] = args[6].toLowerCase();

    if(classes[args[6]]) {
      args[6] = classes[args[6]];
    } else {
      message.channel.send(usageMsg);
      return;
    }

    for (let i = 0; i < 4; i++) {
      args[i] = parseInt(args[i]);

      if(!Number.isInteger(args[i])) {
        message.channel.send(usageMsg);
      }
    }
    add(message, args);
  },
}
