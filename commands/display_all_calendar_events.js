const Discord = require('discord.js')
const fs = require('fs');

module.exports = {
    name: 'display_all_calendar_events',
    aliases: ['dall', 'dates'],
    async execute(client, message, args) {

        var match = true;
        var cab = true;
        var ext = true;

        /** Check if there are args and if they're correct */
        if (args.length > 3)
            return message.reply('trop d\'arguments, la commande doit être utilisée ainsi: -dall <argument optionnel 1> <argument optionnel 2> <argument optionnel 3>, les arguments doivent être "Match" ou "Cabaret" ou "Extérieur');

        if (args.length > 0) {
            match = false;
            cab = false;
            ext = false;
            for (const arg of args) {
                if (arg.toLowerCase() != 'match' && arg.toLowerCase() != 'cabaret' && arg.toLowerCase() != 'extérieur' && arg.toLowerCase() != 'exterieur') {
                    return message.reply('argument(s) invalide(s), la commande doit être utilisée ainsi: -dall <argument optionnel 1> <argument optionnel 2> <argument optionnel 3>, les arguments doivent être "Match" ou "Cabaret" ou "Extérieur');
                } else if (arg.toLowerCase() == 'match') {
                    match = true;
                } else if (arg.toLowerCase() == 'cabaret') {
                    cab = true;
                } else {
                    ext = true;
                }
            }
        }

        /** Fetch next events data from file */
        const events_data = fs.readFileSync('./files/events.json');
        var events = JSON.parse(events_data);

        /** Build the embedded response */
        var embedded_msg = new Discord.MessageEmbed()
            .setTitle('Agenda TIPS')
            .setURL('https://calendar.google.com/calendar/u/1?cid=NHZocWR2aXF1bDU4YW5vaThsYnUzZ2YwdjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ');

        if (match) {
            for (const ev of events.Matchs) {
                embedded_msg.addFields({ name: 'Nom', value: `${ev.name}` }, { name: 'id', value: `${ev.id}`, inline: true }, { name: 'date', value: `${ev.date}`, inline: true }, { name: 'lieu', value: `${ev.lieu}`, inline: true });
            };
        }

        if (cab) {
            for (const ev of events.Cabarets) {
                embedded_msg.addFields({ name: 'nom', value: `${ev.name}` }, { name: 'id', value: `${ev.id}`, inline: true }, { name: 'date', value: `${ev.date}`, inline: true }, { name: 'lieu', value: `${ev.lieu}`, inline: true });
            };
        }
        if (ext) {
            for (const ev of events.Exterieurs) {
                embedded_msg.addFields({ name: 'nom', value: `${ev.name}` }, { name: 'id', value: `${ev.id}`, inline: true }, { name: 'date', value: `${ev.date}`, inline: true }, { name: 'lieu', value: `${ev.lieu}`, inline: true });
            };
        }

        /** Send it */
        return message.channel.send(embedded_msg)
    }
}