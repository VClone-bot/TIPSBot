const Discord = require('discord.js')
const { execute } = require('./ag_poll')

module.exports = {
    name: 'random_member',
    aliases: ['rd_member', 'memberroll'],
    description: 'tag un membre du discord aléatoire',
    async execute(client, message, args) {

        var user = message.guild.members.cache.random();
        message.reply(user.user.username);
    }
}