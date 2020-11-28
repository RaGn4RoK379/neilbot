module.exports = {
    name: "slowmode",
    description: "Set slowmode for channel.",
    aliases: [],
    category: "moderation",
    async execute(client, message, args){
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I don\'t have permissions to do that.")
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don\'t have permision to do this.")
           if (!args[0])return message.channel.send("Please specify a number to set slowmode.")
           if(isNaN(args[0]))return message.channel.send('That is not a valid number. If you are trying to turn slowmode off do `m!slowmode 0` and not `off`')
           if(args[0] > 21600) return message.channel.send("Invalid Number! Number must be below 21600.");
           message.channel.setRateLimitPerUser(args[0])
           message.channel.send(`Sucessfully set slowmode to **${args[0]}**.`)
    }
}