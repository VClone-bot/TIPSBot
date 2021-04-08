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
             * 1 - Loop tant que le vote n'est pas closed
             * 2 - Dans la loop, lorsqu'une réaction est ajoutée vérifier que cet user n'a pas déjà react
             *  2bis - Si l'user a déjà react alors on supprime sa react précédente
             *  Créer une map de tous les users/react et checker si une react est déjà mappé à l'user
             * 3 - Selon un paramètre nb_votants à demander à monke, si nb_votants_eff = nb_votants alors casser la loop
             */

            var poll_open = true;
            var reactmap = new Map();
            const filter = m => m.author.id === message.author.id

            while (poll_open) {
                //Wait for reactions to be put on the poll
                await msg.awaitReactions(true, { max: 1 })
                    .then((collected) => {
                        const reaction = collected.first();
                        //Check if monke already reacted to the poll
                        if (reactmap.has(reaction.author.id)) {
                            //If he did check if the reaction is different from the old one
                            const old_react = reactmap.get(reaction.author.id);
                            if (!(reaction.emoji.name == old_react)) {
                                //If it isn't remove the old reaction
                                msg.reactions.cache.find(r => r.emoji.name == old_react).users.remove(reaction.author.id);
                                //Then change the reaction stored in the Map
                                reactmap.set(reaction.author.id, reaction.emoji.name);
                            } //If it's the same reaction then it doesn't matter because it means he removed the old one and added the same one again
                        } else {
                            //If it's monke's first react we need to create a Map entry for him
                            reactmap.set(reaction.author.id, reaction.emoji.name);
                        }
                    });
                //After processing the reaction, check if the original poster closed the poll
                await message.channel.awaitMessages(filter, { max: 1, time: 50 })
                    .then((collected2) => {
                        const authormessage = collected2.first().content;
                        //If he did then close the poll, else continue
                        if (authormessage == 'close poll') {
                            poll_open = false;
                        }
                    });
            }

        } else {
            message.reply('vous n\'avez pas des droits suffisants pour exécuter cette commande');
        }
    }
}