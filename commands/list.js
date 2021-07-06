const Discord = require('discord.js');
const { mongo } = require("../connect");

function listGear (message, args) {
  const guild = message.guild.id;
  const db = mongo.db('RoninsGearBot');
  const col = db.collection(guild);

  const c = db.collection(guild).find({}).sort({gearscore:-1});
  const itemsPerPage = 10;

  const headerMsg = `#    Family        Character     AP   AAP  DP   GS    Class        Level  Updated
---  ------------  ------------  ---  ---  ---  ----  -----------  -----  ---------------`;

  let i, rank;
  let listMsg = headerMsg;

  i = 0;
  rank = 1;


  c.each(function(err, doc) {

    if(doc)
    {
      listMsg = addToList(doc, listMsg, rank);
      rank++;
      i++;
    } else {
      if(listMsg !== ''){
        message.channel.send(`\`\`\`${listMsg}\`\`\``);
        return;
      }
    }
    // 10 entries per "page"
    if(i === itemsPerPage){
      message.channel.send(`\`\`\`${listMsg}\`\`\``);
      // reset i = 0;
      i = 0;

      // clear msg
      listMsg = '';
    }
  });

}

function addToList(doc, msg, rank) {
  let family, character;

  family = trimEnd(doc.family);
  character = trimEnd(doc.character);

  msg = msg + `
${rank.toString().padEnd(3)}  ${family.padEnd(12)}  ${character.padEnd(12)}  ${doc.ap.toString().padEnd(3)}  ${doc.aap.toString().padEnd(3)}  ${doc.dp.toString().padEnd(3)}  ${doc.gearscore.toString().padEnd(4)}  ${doc.class.padEnd(11)}  ${doc.level.toString().padEnd(5)}  ${doc.lastUpdated.padEnd(10)}`
  // console.log(msg);
  return msg;

}

function trimEnd(msg) {
  const maxLen = 12;
  if(msg.length > maxLen)
  {
    msg = msg.substring(0, maxLen);
    // msg += '...';
  }
  return msg;
}

module.exports = {
  name: 'list',
  description: 'Liste des équipements enregistrés par le le Ronins GearBot.',
  execute (message, args) {
    listGear(message, args);
  }
}
