const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: 'add_improv_class',
    aliases: ['addc', 'add_class'],
    cooldown: 2,
    async execute(client, message, args) {

        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.has('442430651514224640') ||
            message.member.roles.cache.has('504226983257833481')) {

            /** Monkecheck given arguments */
            if (args.length < 4)
                return message.reply("trop peu d'arguments, la commande doit être utilisée ainsi: -addc <Nom du cours (Mardi/Jeudi/Gibbons)> <jour de la semaine du cours> <date du cours au format JJ-MM-AAAA> <heure du cours au format HH:MM>");

            if (args.length > 4)
                return message.reply("trop d'arguments, la commande doit être utilisée ainsi: -addc <Nom du cours (Mardi/Jeudi/Gibbons)> <jour de la semaine du cours> <date du cours au format JJ-MM-AAAA> <heure du cours au format HH:MM>");

            if (args[0].toLowerCase() != 'mardi' && args[0].toLowerCase() != 'jeudi' && args[0].toLowerCase() != 'gibbons')
                return message.reply("erreur: le type d'événement doit être \"Mardi\" ou \"Jeudi\" ou \"Gibbons\"");

            var class_place;

            /** Filter to only process the monke's replies */
            const filter = m => m.author.id === message.author.id

            /** Ask monke for the class' place */
            message.reply("Où aura lieu le cours ?");
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

            /** Regexp to match the HH:MM hour format */
            const date_regexp = new RegExp('^([0-9]{2}[:|h][0-9]{2})$');
            if (!date_regexp.test(args[3]))
                return message.reply("erreur: le format horaire doit être HH:MM");

            /** Read JSON data and convert it to a json javascript object */
            var classes_data = fs.readFileSync('./files/classes.json');
            var classes = JSON.parse(classes_data);

            /** Find unique ID that should be given to the class */
            var next_id;
            const keys = Object.keys(classes);
            var id_arr = [];

            /** Build array containing all existing IDs */
            for (const key of keys) {
                for (const c of classes[key]) {
                    id_arr.push(c.id);
                }
            }
            /** Find lowest possible ID */
            for (i = 0; i < 10000; i++) {
                if (!id_arr.includes(`${i}`)) {
                    next_id = i;
                    break;
                }
            }

            /** Build the new class that'll be added to the JSON file */
            let new_class = {
                id: `${next_id}`,
                name: `${args[0]}`,
                date: `${args[1]} ${args[2]}`,
                heure: `${args[3]}`,
                lieu: `${class_place}`
            }

            /** Check in which category the class belongs, then insert it into the JSON javascript object */
            if (args[0].toLowerCase() == 'mardi') {
                classes.Mardi.push(new_class);
            } else if (args[0].toLowerCase() == 'jeudi') {
                classes.Jeudi.push(new_class);
            } else {
                classes.Gibbons.push(new_class);
            }

            /** Convert JSON object to string and dump it in the file */
            const new_data = JSON.stringify(classes);
            fs.writeFile("./files/classes.json", new_data, (err) => {
                // Error checking
                if (err) throw err;
            });

            return message.channel.send("Le cours a bien été ajouté !");
        } else {
            message.reply('vous n\'avez pas des droits suffisants pour exécuter cette commande');
        }
    }
}