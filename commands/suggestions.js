const Discord = require('discord.js')

module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion'],
    description: 'permet de faire des suggestions qui seront ajoutées au channel suggestions',
    async execute(client, message, args) {

        const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
        if (!channel) return message.channel.send('Le chan suggestions n\'existe pas');

        let messageArgs = args.join(' ');
        const embedded_msg = new Discord.MessageEmbed()
            .setColor('FADF2E')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(messageArgs);

        channel.send(embedded_msg).then((msg) => {
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err) => {
            console.log(err);
        });
    }
}