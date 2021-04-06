const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
token = 'ODI4ODI3MTExNDQ3MTk5NzY4.YGvPZg.OVvIItRpGrez-KVQS5TrnguouH8';

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.login(token);