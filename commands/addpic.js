const Discord = require('discord.js');
const { mongo } = require("../connect");
const { prefix } = require("../config.json");

async function addpic (message, args) {
  try{
    const guild = message.guild.id;
    const db = mongo.db('RoninsGearBot');
    const col = db.collection(guild);
    const errmsg = 'Utilise la commande en ajoutant la photo de ton gear en appuyant sur le bouton upload de discord.';

    let date = new Date().toDateString();
    let target = message.author.id;
    let imgurl;

    const p = await col.findOne({discordID: target});

    if(p === null) {
      message.channel.send(`Premièrement, ajouter un gear à votre compte ${prefix}add command.`);
      return;
    }


    await new Promise(resolve => setTimeout(resolve, 1000));
    // to let embeds generate if loaded for the first time.

    if(message.attachments.size > 0) {
      const attch = message.attachments.first();

      if(attch.height != null && attch.width != null) {

        imgurl = attch.url;
      }
    }
    else if (message.embeds.length > 0) {
      const em = message.embeds;

      if(em[0].type === 'image')
      {
        imgurl = em[0].url;
        // console.log(imgurl);
      } else {
        message.channel.send(errmsg);
        return;
      }
    } else {
      message.channel.send(errmsg);
      return;
    }

    await col.updateOne(
      {"discordID": message.author.id}, {$set: {pic: imgurl}});

    await col.updateOne(
      {"discordID": message.author.id}, {$set: {lastUpdated: date}});

      message.channel.send("added")

  } catch (err) {
    message.channel.send(`Échec de l'ajout de la photo`);
    console.log(err);
  }
}

module.exports = {
  name: 'addpic',
  description: `Ajoute une photo à ton équipement`,
  execute (message, args) {
    addpic(message, args);
  }
}
