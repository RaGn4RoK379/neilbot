module.exports = {
  name: "purge",
  description: "Purge certain amount of messages.",
  aliases: ['clear'],
  category: "moderation",
  async execute(client, message, args){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Uff! It seem like you don\'t have permission to do that.").then(m => m.delete(5000));
      if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I don\'t have permissions to do that.")
      if(isNaN(args[0])) return message.channel.send("This is not a valid amount of messages to delete.");
      if(!args[0]) return message.channel.send("You need to specify a number of messages to delete.");
      if(args[0] >= 100) return message.channel.send("Number of messages to purge can not be more than 99.")
      message.channel.bulkDelete(args[0])
  }
}