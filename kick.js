module.exports = {
    name: "kick",
    description: "Kick a user.",
    aliases: ['kuser', "remove"],
    category: "moderation",
    async execute(client, message, args){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don\'t have permssion to do that.")
        if(!message.mentions.users.first()) return message.channel.send("Please mention a member you want to kick.")
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I don\'t have permissions to do that.")
        if(message.member.hasPermission("KICK_MEMBERS")){
           if (message.mentions.members.first()) {
              message.mentions.members.first().kick().then((member) => {
                 var kickEmb = new Discord.MessageEmbed()
                 .setTitle('Kick:')
                 .setDescription(`Kicked ${message.mentions.members.first()} from the server.`)
                 .setFooter(message.author.tag, message.author.displayAvatarURL())
     
                 message.channel.send(kickEmb)
              })
           }
        }
    }
}