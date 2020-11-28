const { stripIndent } = require("common-tags")
const Discord = require("discord.js")
const { prefix } = require("../config.json")

module.exports = {
    name: "help",
    description: "Show a help embed.",
    aliases: ['h', "commands", "halp"],
    category: "info",
    async execute(client, message, args){
        const data = [];
        const { commands } = message.client

        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Help:`)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`
**__GIVEAWAYS__**
gstart
gend
greroll
gdelete

**__MODERATION__**
kick
ban
unban
purge
slowmode

**__INFO__**
stats
serverinfo
whois
help
            `)
            .addField(
                `You can use ${prefix}help [command name] to get info about a specific command.`,
                `${prefix}help [command name]`)
            message.channel.send(embed)
            return;
        }
        const name = args[0]
        const cmd = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))
        if(!cmd){
            message.channel.send(`${name} is not a valid command.`)

            return;
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`Help:`)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        data.push(`Name: **${cmd.name}**`);
        if(cmd.description) data.push(`Description: **${cmd.description}**`)
        if(cmd.aliases) data.push(`Aliases: **${cmd.aliases.join(", ")}**`)
        if(cmd.category) data.push(`Category: **${cmd.category}**`)
        message.channel.send(embed.setDescription(data))
        return;
    },
}