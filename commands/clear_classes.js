const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: 'clear_classes',
    description: 'clear the class calendar of all past classes',
    aliases: ['clearclass', 'clearc'],
    cooldown: 15,
    async execute(client, message, args) {
        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.has('442430651514224640') ||
            message.member.roles.cache.has('504226983257833481')) {

            var today = new Date();

            /** Fetch classes data from file */
            const classes_data = fs.readFileSync('./files/classes.json');
            var classes = JSON.parse(classes_data);

            /** Loop through all classes and remove those which are in the past */
            const keys = Object.keys(classes);
            for (const key of keys) {
                for (i = 0; i < classes[key].length; i++) {
                    const c_date = classes[key][i].date.split(/ +/)[1].split('-');

                    const day = c_date[0];
                    const month = c_date[1];
                    const year = c_date[2];

                    const date = new Date(`${year}-${month}-${day}`);

                    if (today > date) {
                        events[key].splice(i, 1);
                        continue;
                    }
                }
            }

            /** Write modified JSON object to file */
            const new_data = JSON.stringify(classes);
            fs.writeFile("./files/classes.json", new_data, (err) => {
                // Error checking
                if (err) throw err;
            });

            return message.channel.send("Le calendrier des cours a bien été nettoyé !");
        } else {
            message.reply('vous n\'avez pas des droits suffisants pour exécuter cette commande');
        }
    }
}