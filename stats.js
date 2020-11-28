const Discord = require("discord.js");
const ms = require("ms");
const { execute } = require("./giveaway");

module.exports = {
    name: "stats",
    description: "Show bot's stats.",
    aliases: ['botstats', "bstats", "bs"],
    category: "info",
    async execute(client, message, args){
        const embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}'s stats:`)
        .setDescription(`
Servers: **${client.guilds.cache.size}**\n
Users: **${client.users.cache.size}**\n
Channels: **${client.channels.cache.size}**\n
Uptime: **${ms(client.uptime, { long: true})}**\n
        `)
        .setFooter(message.author.tag, message.author.displayAvatarURL())

        return message.channel.send(embed)
    }
}