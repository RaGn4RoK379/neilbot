const db = require('quick.db')
const Discord = require('discord.js')
module.exports = {
    name: "eval",
    description: "Evaluate a given code.",
    aliases: ['ev'],
    category: "info",
    async execute(client, message, args){
        if(message.author.id !== '642435119944171550') return message.channel.send('Sorry, but eval command is only for owner.')
        const { inspect } = require('util');
        const { stripIndents } = require('common-tags');
        const { VultrexHaste } = require('vultrex.haste');
        const haste = new VultrexHaste({ url: "https://hasteb.in"});
        const command = args.slice(0).join(" ")
     
        if(!command) return message.channel.send('Provide a valid javascript code.')
        try {
           const evaled = eval(command)
           var evalEmb = new Discord.MessageEmbed()
           .setTitle('Evaluated:')
           .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
           .addFields(
              { name: 'To Evaluate', value: `\`\`\`${command}\`\`\`` },
              { name: 'Evaled', value: `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\`` },
              { name: 'Type Of', value: `\`\`\`${typeof(evaled)}\`\`\`` },
           )
           await message.channel.send(evalEmb)
        } catch (err) {
           var errorembed = new Discord.MessageEmbed()
           .setTitle('Error:')
           .setDescription(err)
           .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
           await message.channel.send(errorembed)
        }
     }
};