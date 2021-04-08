require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
const fs = require('fs');
const cooldowns = new Map();
const Discord = require('discord.js');

module.exports = (Discord, client, message) => {

    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd.length == 0)
        return message.reply("vous avez oublié d'entrer une commande");

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (!command)
        return message.reply("ceci n'est pas une commande");

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_value = (command.cooldown) * 1000;

    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_value;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;
            return message.reply(`Veuillez attendre ${time_left.toFixed(1)} secondes avant de réutiliser cette commande`);
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_value);

    try {
        if (command) command.execute(client, message, args, Discord);
    } catch (err) {
        console.log(err);
        return message.reply("une erreur a été détectée, veuillez réessayer");
    }
}