const Discord = require('discord.js');
const { mongo } = require("../connect");

async function info (message, args) {
  try{
    const guild = message.guild.id;
    const db = mongo.db('RoninsGearBot');
    const col = db.collection(guild);

    // request avg of ap/aap/dp/gs

    let avg = col.aggregate([{$group: {
      _id:null,
      avgap: {$avg:"$ap"},
      avgaap: {$avg:"$aap"},
      avgdp: {$avg:"$dp"},
      avggs: {$avg:"$gearscore"}
    } }]);

    let ap, aap, dp, gs;

    await avg.forEach(function(item) {
      ap = item.avgap.toFixed(2);
      aap = item.avgaap.toFixed(2);
      dp = item.avgdp.toFixed(2);
      gs = item.avggs.toFixed(2);
    });

    const av = message.guild.iconURL();

    let highest, lowest;

    const max = db.collection(guild).find().sort({gearscore:-1}).limit(1);
    await max.forEach(function(item) {
      highest = item;
    });

    const min = db.collection(guild).find().sort({gearscore:1}).limit(1);
    await min.forEach(function(item) {
      lowest = item;
    });



    const disp = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name}`)
    .setDescription(`Guild stats for ${message.guild.name}`)
    .setThumbnail(av)
    .setColor('RED')
    .addField('Average AP', ap, true)
    .addField('Average AAP', aap, true)
    .addField('Average DP', dp, true)
    .addField('Average Gearscore', gs, false)
    .addField('Highest Gear', `${highest.family} (${highest.character}) - ${highest.gearscore}`, false)
    .setFooter('RoninsHope GearBot (Beta)', 'https://cdn.discordapp.com/icons/416664611748577290/8040bc65aa56a67da11b3cc4ded5eb73.webp?size=2048');

    message.channel.send(disp);


// console.log(avgAP);




    // ({
    //   "$group": {
    //     "_id": null,
    //     "avg": {$avg: "$ap"}
    //   }
    // });
    // avgAP.forEach(function(item) {
    //   console.log(item);
    // });

  } catch (err) {
  } finally {

  }
}

module.exports = {
  name: 'info',
  description: 'displays info about the server',
  execute (message, args) {
    info(message, args);
  }
}
