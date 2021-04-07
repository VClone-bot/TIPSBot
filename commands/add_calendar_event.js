const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: 'add_calendar_event',
    aliases: ['adde', 'add_event'],
    cooldown: 2,
    async execute(client, message, args) {

        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.ahs('442430651514224640')) {
            /** Monkecheck given arguments */
            if (args.length < 3)
                return message.reply("trop peu d'arguments, la commande doit être utilisée ainsi: -adde <type d'événement (Match/Cabaret/Extérieur)> <jour de la semaine de l'événement> <date de l'événément au format JJ-MM-AAAA>");

            if (args.length > 3)
                return message.reply("trop d'arguments, la commande doit être utilisée ainsi: -adde <type d'événement (Match/Cabaret/Extérieur)> <jour de la semaine de l'événement> <date de l'événément au format JJ-MM-AAAA>");

            if (args[0].toLowerCase() != 'match' && args[0].toLowerCase() != 'cabaret' && args[0].toLowerCase() != 'extérieur' && args[0].toLowerCase() != 'exterieur')
                return message.reply("erreur: le type d'événement doit être \"Match\" ou \"Cabaret\" ou \"Extérieur\"");

            var event_name;
            var event_place;

            /** Filter to only process the monke's replies */
            const filter = m => m.author.id === message.author.id

            /** Ask monke for the event's name and place */
            message.reply("Quel est le nom de l'événement ?");
            await message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(collected => {
                    event_name = collected.first().content;
                })
                .catch(() => {
                    message.channel.send("Timeout");
                });

            message.reply("Quel est le lieu de l'événement ?");
            await message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(collected => {
                    event_place = collected.first().content;
                })
                .catch(() => {
                    message.channel.send("Timeout");
                });

            /** Regexp to match the DD-MM-YYYY date format */
            const date_regexp = new RegExp('^(0?[1-9]|[12][0-9]|3[01])[-\\/ ]?(0?[1-9]|1[0-2])[-/ ]?(?:19|20)[0-9]{2}$');
            if (!date_regexp.test(args[2]))
                return message.reply("erreur: le format de date doit être JJ-MM-AAAA");

            /** Read JSON data and convert it to a json javascript object */
            var event_data = fs.readFileSync('./files/events.json');
            var events = JSON.parse(event_data);

            /** Find unique ID that should be given to the event */
            var next_id;
            const keys = Object.keys(events);
            var id_arr = [];
            /** Build array containing all existing IDs */
            for (const key of keys) {
                for (const ev of events[key]) {
                    id_arr.push(ev.id);
                }
            }
            /** Find lowest possible ID */
            for (i = 0; i < 10000; i++) {
                if (!id_arr.includes(`${i}`)) {
                    next_id = i;
                    break;
                }
            }

            /** Build the new event that'll be added to the JSON file */
            let new_event = {
                id: `${next_id}`,
                name: `${event_name}`,
                date: `${args[1]} ${args[2]}`,
                lieu: `${event_place}`
            }

            /** Check in which category the event belongs, then insert it into the JSON javascript object */
            if (args[0].toLowerCase() == 'match') {
                events.Matchs.push(new_event);
            } else if (args[0].toLowerCase() == 'cabaret') {
                events.Cabarets.push(new_event);
            } else {
                events.Exterieurs.push(new_event);
            }

            /** Convert JSON object to string and dump it in the file */
            const new_data = JSON.stringify(events);
            fs.writeFile("./files/events.json", new_data, (err) => {
                // Error checking
                if (err) throw err;
            });

            return message.channel.send("L'événement a bien été ajouté !");
        }
    }
}