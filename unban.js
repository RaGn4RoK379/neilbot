module.exports = {
    name: "unban",
    description: "Unban a user.",
    aliases: ['ub', "ubuser"],
    category: "moderation",
    async execute(client, message, args){
        if(message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don\'t have permission to do that.")
        if(!args[0]) return message.channel.send("Please specify member id you want to unban.")
        let member = await client.users.cache.get(args[1] || client.users.cache.fetch(args[0]).catch(() => null));
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I don\'t have permissions to do that.")
        try{
            message.guild.members.unban(member.id);
        }catch(err){
            message.channel.send(`This user is not banned.`)
        }
        var banEmb = new Discord.MessageEmbed()
           .setTitle('Unban:')
           .setDescription(`Unbanned ${message.mentions.members.first} from the server.`)
           .setFooter(message.author.tag, message.author.displayAvatarURL())
     
           message.channel.send(banEmb)
    }
}