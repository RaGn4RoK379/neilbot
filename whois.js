const Discord = require("discord.js")

module.exports = {
    name: "whois",
    description: "Show info about user.",
    aliases: ["userinfo", "who"],
    category: "info",
    async execute(client, message, args){
        if(message.mentions.users.first()){
            const member = message.mentions.users.first()
            const user = message.guild.members.cache.get(member.id)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Userinfo:`, member.displayAvatarURL())
            .setDescription(`
Username: **${user.user.username}**\n
User ID: **${user.user.id}**\n
Created at: **${member.createdAt}**\n
Joined at: **${user.joinedAt}**\n
Role count: **${user.roles.cache.size}**\n
            `)
            .setFooter(member.tag, member.displayAvatarURL())
            message.channel.send(embed)
        }
        if(!message.mentions.users.first()){
            const data = []
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Userinfo:`, message.author.displayAvatarURL())
            .setDescription(`
Username: **${message.author.username}**\n
User ID: **${message.author.id}**\n
Created at: **${message.author.createdAt}**\n
Joined at: **${message.member.joinedAt}**\n
Role count: **${message.member.roles.cache.size}**\n
            `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            message.channel.send(embed)
        }
    }
}