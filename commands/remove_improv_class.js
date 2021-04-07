const Discord = require('discord.js')
const fs = require('fs');

module.exports = {
    name: 'remove_improv_class',
    aliases: ['rmc', 'remove_cours', 'remove_class', 'rmcours'],
    cooldown: 5,
    async execute(client, message, args) {
        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.has('442430651514224640') ||
            message.member.roles.cache.has('442430651514224640')) {

            /** Fetch next classes data from file */
            const classes_data = fs.readFileSync('./files/classes.json');
            var classes = JSON.parse(classes_data);

            /** Check that the ID given by the Monke exists in the file, remove it if it does*/
            found = false;
            const keys = Object.keys(classes);

            for (const key of keys) {
                for (i = 0; i < classes[key].length; i++) {
                    if (classes[key][i].id == args[0]) {
                        classes[key].splice(i, 1);
                        break;
                    }
                }
            }

            /** Write modified JSON object to file */
            const new_data = JSON.stringify(classes);
            fs.writeFile("./files/classes.json", new_data, (err) => {
                // Error checking
                if (err) throw err;
            });

            return message.channel.send("Le cours a bien été supprimé !");
        } else {
            message.reply('vous n\'avez pas des droits suffisants pour exécuter cette commande');
        }
    }
}