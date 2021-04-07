const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: 'clear_calendar',
    description: 'clear the event calendar of all past events, can receive a date argument to remove only events before a certain date, cannot remove future events',
    aliases: ['clearevents', 'clearev'],
    cooldown: 15,
    async execute(client, message, args) {
        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.ahs('442430651514224640')) {
            /** Check args */
            if (args.length > 1) {
                return message.reply('trop d\'arguments, la commande doit être utilisée ainsi: -clearev <argument de date optionnel au format JJ-MM-AAAA>');
            }

            /** Regexp to match the DD-MM-YYYY date format */
            const date_regexp = new RegExp('^(0?[1-9]|[12][0-9]|3[01])[-\\/ ]?(0?[1-9]|1[0-2])[-/ ]?(?:19|20)[0-9]{2}$');
            if (!date_regexp.test(args[0]))
                return message.reply("erreur: le format de date doit être JJ-MM-AAAA");

            var today;
            if (args.length > 0) {
                const arg_date = args[0].split('-');

                const arg_day = arg_date[0];
                const arg_month = arg_date[1];
                const arg_year = arg_date[2];

                current_day = new Date();
                today = new Date(`${arg_year}-${arg_month}-${arg_day}`);

                if (today > current_day) {
                    return message.reply('vous ne pouvez pas supprimer les événements futurs avec cette commande, utilisez plutôt la commande -rme');
                }
            } else {
                today = new Date();
            }

            /** Fetch events data from file */
            const events_data = fs.readFileSync('./files/events.json');
            var events = JSON.parse(events_data);

            /** Loop through all events and remove those which are in the past, or before the optional argument passed */
            const keys = Object.keys(events);
            for (const key of keys) {
                for (i = 0; i < events[key].length; i++) {
                    const ev_date = events[key][i].date.split(/ +/)[1].split('-');

                    const day = ev_date[0];
                    const month = ev_date[1];
                    const year = ev_date[2];

                    const date = new Date(`${year}-${month}-${day}`);

                    if (today > date) {
                        events[key].splice(i, 1);
                        continue;
                    }
                }
            }

            /** Write modified JSON object to file */
            const new_data = JSON.stringify(events);
            fs.writeFile("./files/events.json", new_data, (err) => {
                // Error checking
                if (err) throw err;
            });

            return message.channel.send("Le calendrier a bien été nettoyé !");
        }
    }
}