const Discord = require('discord.js')
const fs = require('fs')
const db = require('quick.db')
const config = require('./config.json')
const prefix = config.prefix;
const { GiveawaysManager } = require('discord-giveaways')
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 10,
    kickThreshold: 20, 
    banThreshold: 30, 
    maxInterval: 2000,
    warnMessage: '{@user}, please stop spamming.', 
    kickMessage: '**{user_tag}** has been kicked for spamming.', 
    banMessage: '**{user_tag}** has been banned for spamming.', 
    maxDuplicatesWarning: 7,
    maxDuplicatesKick: 10,
    maxDuplicatesBan: 12,
    exemptPermissions: ['ADMINISTRATOR'],
    ignoreBots: true,
    verbose: true,
    ignoredUsers: [],
});
const client = new Discord.Client()
client.config = config
client.login(config.token)

client.giveawaysManager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES"],
        embedColor: "#0341fc",
        reaction: "🎉",
    }
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync('./commands/')
const cmds = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of cmds){
    const cmd = require(`./commands/${file}`)

    client.commands.set(cmd.name, cmd)
}
client.once('ready', () => {
    console.log(`${client.user.username} is ready!`)
    client.user.setActivity(`${prefix}help | ${client.guilds.cache.size} servers.`)
})
client.on('message', async message => {
    if(message.author.bot) return;
    antiSpam.message(message)
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
    
    try{
        cmd.execute(client, message, args)
    }catch(err){
        message.channel.send("There was an error trying to execute this command. Please try later.")
    }
})