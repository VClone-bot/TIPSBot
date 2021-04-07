const dotenv = require('dotenv');
const fs = require('fs');

module.exports = {
    name: 'modify_prefix',
    aliases: ['prefix', 'prefixe', 'préfixe'],
    description: 'allows monkes to modify the bot prefix',
    cooldown: 10,
    async execute(client, message, args) {

        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.has('442430651514224640')) {

            /** Check the args */
            if (args.length != 1)
                return message.reply('vous devez spécifier un argument en utilisant cette commande: -prefix <nouveau préfixe>');

            if (args[0].length > 3)
                return message.reply('ça sert à rien de faire un préfixe trop long gros débile');

            /** Use regexp to check prefix validity */
            const date_regexp = new RegExp('^([A-Za-z]|[0-9]|[-&+=^~])*$');
            if (!date_regexp.test(args[0]))
                return message.reply("des caractères interdits ont été détectés, veuillez n'utiliser que des caractères alphanumériques ou parmi la liste de caractères spéciaux suivante: [-&+=^~]");

            /** Read .env file and change the PREFIX line */
            var config = fs.readFileSync('./.env').toString().split('\n');
            var new_config_array = [];
            for (var line of config) {
                if (line.split(/ +/)[0] == 'PREFIX') {
                    new_config_array.push(`PREFIX = ${args[0]}`);
                } else {
                    new_config_array.push(line);
                }
            }

            /** Build new config file and write it */
            const new_config = new_config_array.join('\n');
            fs.writeFile("./.env", new_config, (err) => {
                // Error checking
                if (err) throw err;
            });

            /** Change current prefix */
            const prefix = process.env.PREFIX;

            return message.channel.send("Le préfixe a bien été mis à jour!");
        } else {
            message.reply('vous n\'avez pas des droits suffisants pour exécuter cette commande');
        }
    }
}