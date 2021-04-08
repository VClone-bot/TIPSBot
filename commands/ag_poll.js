const Discord = require('discord.js')

module.exports = {
    name: 'ag_poll',
    aliases: ['poll', 'agpoll', 'makevote', 'mkvote'],
    description: 'permet de créer un vote pour les assemblées générales',
    async execute(client, message, args) {
        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442430651514224640')) {

            /** Ask monke how many times can one monke vote on the poll */
            const filter = m => m.author.id === message.author.id
            var nb_votes = 0;
            message.reply("Combien de votes possibles/personne ? (par défaut: infini)");
            await message.channel.awaitMessages(filter, { max: 1 }).then(collected => {
                    reply = collected.first().content;
                    if (!isNaN(reply)) nb_votes = parseInt(reply);
                })
                .catch(() => {
                    message.channel.send("Timeout");
                });

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
                    .then(() => message.reply('Utilisez la commande %close% quand vous souhaiterez fermer le vote'))
                    .then(() => message.delete())
                    .then(async() => {
                        var poll_open = true;
                        while (poll_open) {
                            var too_much_votes = false;
                            /** Wait indefinitely for the monke to close the poll */
                            await message.channel.awaitMessages(filter, { max: 1 })
                                .then((collected) => {
                                    const authormessage = collected.first().content;
                                    /** If monke is closing the poll check that each monke only voted once if necessary */
                                    if (authormessage == '%close%') {
                                        if (nb_votes > 0) {
                                            /** Create Map containing every monke who reacted to the message, and the number of reactions */
                                            var reactmap = new Map();
                                            /** Iterate through all of the message's reactions */
                                            for (const reaction of message.reactions.cache.each()) {
                                                /** Iterate through all the monkes who put that specific react on the message, check that the author of the react isn't the bot itself too */
                                                for (const user of reaction.users.cache.each()) {
                                                    if (user.id != msg.author.id) {
                                                        if (!reactmap.has(user.id)) {
                                                            reactmap.set(user.id, 1);
                                                        } else {
                                                            reactmap.set(user.id, reactmap.get(user.id) + 1);
                                                        }
                                                    }
                                                }
                                            }
                                            /** Then check that for every monke the number of reacts is < nb_votes */
                                            for (const entry of reactmap) {
                                                if (reactmap.get(entry) > nb_votes) {
                                                    too_much_votes = true;
                                                }
                                            }
                                        }
                                        /** If author asked to close and there isn't too much votes poll isn't open anymore */
                                        poll_open = too_much_votes;
                                    }
                                });
                        }
                    })

            }).catch((err) => {
                console.log(err);
            });
        } else {
            message.reply('vous n\'avez pas des droits suffisants pour exécuter cette commande');
        }
    }
}