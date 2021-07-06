const Discord = require('discord.js');
const { mongo } = require("../connect");
const { prefix } = require("../config.json");

module.exports = {
  name: 'help',
  execute (message, args) {

    const disp = new Discord.MessageEmbed()
    .setColor('#3498db')
    .setTitle(`Pour commencer...`)
    .addField(`Utilise ${prefix}add pour ajouter ton gear au  RoninsGearBot`, `${prefix}add <ap> <aap> <dp> <level> <Character> <Family> <class> `, false)
    .addField(`Commande disponible:`,
`${prefix}add
${prefix}addpic <lien> OU <image ajouté>
${prefix}update
${prefix}list
${prefix}gear <@user>
${prefix}delete
${prefix}info`)
    .setFooter(`RoninsGearBot (beta) | S'il y a un problème contacter Raphaël (GilloDaby)#0750`, 'https://cdn.discordapp.com/icons/416664611748577290/8040bc65aa56a67da11b3cc4ded5eb73.webp?size=2048');

  message.channel.send(disp);

  }
}
