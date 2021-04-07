const Discord = require('discord.js')
const fs = require('fs');

module.exports = {
    name: 'remove_calendar_event',
    aliases: ['rme', 'remove_event'],
    cooldown: 5,
    async execute(client, message, args) {
        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.ahs('442430651514224640')) {
            /** Fetch next events data from file */
            const events_data = fs.readFileSync('./files/events.json');
            var events = JSON.parse(events_data);

            /** Check that the ID given by the Monke exists in the file, remove it if it does*/
            found = false;
            const keys = Object.keys(events);

            for (const key of keys) {
                for (i = 0; i < events[key].length; i++) {
                    if (events[key][i].id == args[0]) {
                        events[key].splice(i, 1);
                        break;
                    }
                }
            }

            /** Write modified JSON object to file */
            const new_data = JSON.stringify(events);
            fs.writeFile("./files/events.json", new_data, (err) => {
                // Error checking
                if (err) throw err;
            });

            return message.channel.send("L'événement a bien été supprimé !");
        }
    }
}