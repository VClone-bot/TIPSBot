const Discord = require('discord.js')
const fs = require('fs');

module.exports = {
    name: 'display_all_classes',
    aliases: ['dallc', 'datesc', 'cours'],
    cooldown: 5,
    async execute(client, message, args) {

        var mardi = true;
        var jeudi = true;
        var gib = true;

        /** Check if there are args and if they're correct */
        if (args.length > 3)
            return message.reply('trop d\'arguments, la commande doit être utilisée ainsi: -allcours <argument optionnel 1> <argument optionnel 2> <argument optionnel 3>, les arguments doivent être "Mardi" ou "Jeudi" ou "Gibbons');

        if (args.length > 0) {
            mardi = false;
            jeudi = false;
            gib = false;
            for (const arg of args) {
                if (arg.toLowerCase() != 'mardi' && arg.toLowerCase() != 'jeudi' && arg.toLowerCase() != 'gibbons') {
                    return message.reply('argument(s) invalide(s), la commande doit être utilisée ainsi: -allcours <argument optionnel 1> <argument optionnel 2> <argument optionnel 3>, les arguments doivent être "Mardi" ou "Jeudi" ou "Gibbons');
                } else if (arg.toLowerCase() == 'mardi') {
                    mardi = true;
                } else if (arg.toLowerCase() == 'jeudi') {
                    jeudi = true;
                } else {
                    gib = true;
                }
            }
        }

        /** Fetch next classes data from file */
        const classes_data = fs.readFileSync('./files/classes.json');
        var classes = JSON.parse(classes_data);

        /** Build the embedded response */
        var embedded_msg = new Discord.MessageEmbed()
            .setTitle('Agenda Cours TIPS')
            .setURL('https://calendar.google.com/calendar/u/1?cid=NHZocWR2aXF1bDU4YW5vaThsYnUzZ2YwdjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ');

        if (mardi) {
            for (const c of classes.Mardi) {
                embedded_msg.addFields({ name: 'Nom', value: `${c.name}` }, { name: 'id', value: `${c.id}`, inline: true }, { name: 'date', value: `${c.date}`, inline: true }, { name: 'heure', value: `${c.heure}` }, { name: 'lieu', value: `${c.lieu}`, inline: true });
            };
        }

        if (jeudi) {
            for (const c of classes.Jeudi) {
                embedded_msg.addFields({ name: 'Nom', value: `${c.name}` }, { name: 'id', value: `${c.id}`, inline: true }, { name: 'date', value: `${c.date}`, inline: true }, { name: 'heure', value: `${c.heure}` }, { name: 'lieu', value: `${c.lieu}`, inline: true });
            };
        }

        if (gib) {
            for (const c of classes.Gibbons) {
                embedded_msg.addFields({ name: 'Nom', value: `${c.name}` }, { name: 'id', value: `${c.id}`, inline: true }, { name: 'date', value: `${c.date}`, inline: true }, { name: 'heure', value: `${c.heure}` }, { name: 'lieu', value: `${c.lieu}`, inline: true });
            };
        }

        /** Send it */
        return message.channel.send(embedded_msg)
    }
}