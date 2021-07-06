const Discord = require('discord.js');
const { mongo } = require("../connect");

async function deleteGear (message, args) {
  try{
    const guild = message.guild.id;
    const db = mongo.db('RoninsGearBot');
    const col = db.collection(guild);

    const del = await col.deleteOne({discordID: message.author.id});
    if(del.deletedCount > 0) {
      message.channel.send('Suppression réussie');
    }


  } catch (err) {
    message.channel.send('Échec de la suppression');
  } finally {

  }
}

module.exports = {
  name: 'delete',
  description: 'Supprimer ton équipement',
  execute (message, args) {
    deleteGear(message, args);
  }
}
