const { execute } = require("./eval");

module.exports = {
    name: "gdelete",
    description: "Delete a running giveaway.",
    aliases: ['gd', "delete"],
    category: "giveaways",
    async execute(client, message, args){
        let messageID = args[0];
        client.giveawaysManager.delete(messageID).then(() => {
            message.channel.send("Success! Giveaway deleted!");
        }).catch((err) => {
            message.channel.send("No giveaway found for "+messageID+", please check and try again");
        });
    }
}