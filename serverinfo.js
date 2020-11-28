const Discord = require("discord.js")

module.exports = {
    name: "serverinfo",
    description: "Show info about the server.",
    aliases: ["si", "guildinfo", "server-info", "sinfo", "serveri"],
    category: "info",
    async execute(client, message, args){
        const embed = new Discord.MessageEmbed()
        .setTitle(`Server info:`)
        .setDescription(`
Server name: **${message.guild.name}**\n
Total members: **${message.guild.members.cache.size}**\n
Total channels: **${message.guild.channels.cache.size}**\n
Total roles: **${message.guild.roles.cache.size}**\n
Server Owner: <@${message.guild.owner.id}>\n
Server region: **${message.guild.region}**\n
Server ID: **${message.guild.id}**\n
        `)
        .setFooter(message.author.username, message.author.displayAvatarURL())

        message.channel.send(embed)
    }
}