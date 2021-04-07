const Discord = require('discord.js')

module.exports = {
    name: 'ag_poll',
    aliases: ['poll', 'agpoll', 'makevote', 'mkvote'],
    description: 'permet de créer un vote pour les assemblées générales',
    async execute(client, message, args) {
        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442430651514224640')) {

            /** Join all the arguments so we'll get the full text that Monke has sent, build the response accordingly */
            let messageArgs = args.join(' ');
            const embedded_msg = new Discord.MessageEmbed()
                .setColor('FADF2E')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(messageArgs)
                .addFields({ name: 'Oui', value: '👍', inline: true }, { name: 'Non', value: '👎', inline: true }, { name: 'Abstention', value: '🤷‍♀️', inline: true }, { name: 'NPPAV', value: '🏃‍♀️', inline: true })

            /** Filter to only process the monke's replies */
            const filter = m => m.author.id === message.author.id

            /** Send the response and add the possible reacts to it, delete the command message */
            message.channel.send(embedded_msg).then((msg) => {
                msg.react('👍')
                    .then(() => msg.react('👎'))
                    .then(() => msg.react('🤷‍♀️'))
                    .then(() => msg.react('🏃‍♀️'))
                    .catch(() => console.log('Un emoji n\'a pas pu être ajouté'));
                message.delete();
            }).catch((err) => {
                console.log(err);
            });

            /** Etapes
             * 1 - Loop tant qu'un certain nombre de reacts n'ont pas été ajoutées au message
             * 2 - Dans la loop, lorsqu'une réaction est ajoutée vérifier que cet user n'a pas déjà react
             *  2bis - Si l'user a déjà react alors on supprime sa react précédente
             *  Créer une map de tous les users/react et checker si une react est déjà mappé à l'user
             * 3 - Selon un paramètre nb_votants à demander à monke, si nb_votants_eff = nb_votants alors casser la loop
             */

            //// TODO


        } else {
            message.reply('vous n\'avez pas des droits suffisants pour exécuter cette commande');
        }
    }
}