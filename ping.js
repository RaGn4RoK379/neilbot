const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "Show bot latency.",
    aliases: ['pong'],
    category: "info",
    async execute(client, message, args){
        const e = new Discord.MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`Bot latency - **${client.ws.ping}ms**`)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        message.channel.send(e)
    },
}