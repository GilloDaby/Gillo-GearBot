const Discord = require('discord.js');
const { mongo } = require("../connect");
const { prefix } = require("../config.json");

async function gear(message, args) {
  try{
    const guild = message.guild.id;
    const db = mongo.db('RoninsGearBot');
    const col = db.collection(guild);

    const taggedUser = message.mentions.users.first();

    let target = message.author.id;
    let av = message.author.avatarURL();

    if(taggedUser)
    {
      target = taggedUser.id;
      av = taggedUser.avatarURL();
      // check if other user is tagged and set target = to the other user.
    } else if (args[0]) {
      let targetUser = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(function(ch) {
        usr = ch.first();
        return usr;
      })
      .catch(console.error);
      target = targetUser.user.id;
      av = targetUser.user.avatarURL();
    }

    const p = await col.findOne({discordID: target});

    if(p === null) {
      message.channel.send(`Premièrement, ajouter un gear à votre compte ${prefix}add commande.`);
      return;
    }

    const disp = new Discord.MessageEmbed()
    .setTitle(`${p.family} (${p.character})`)
    .setThumbnail(av)
    .setColor('#e67e22')
    .addField('Class', p.class, false)
    .addField('Level', p.level, false)
    .addField('AP', p.ap, true)
    .addField('AAP', p.aap, true)
    .addField('DP', p.dp, true)
    .addField('Gearscore', p.gearscore, false)
    .setFooter(`last updated at ${p.lastUpdated}.`)
    .setImage(p.pic);

    message.channel.send(disp);

  } catch(err) {
    console.log(err.stack);
    // message.channel.send('Unsuccessful');
  } finally {
  }
}

module.exports = {
  name: 'gear',
  description: 'Montre ton équipement',
  execute (message, args) {

    gear(message, args);
    // console.log(x.id);
  }
}
