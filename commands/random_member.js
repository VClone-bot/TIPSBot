const Discord = require('discord.js')
const { execute } = require('./ag_poll')

module.exports = {
    name: 'random_member',
    aliases: ['rd_member', 'memberroll'],
    description: 'tag un membre du discord aléatoire',
    async execute(client, message, args) {

        /** Get the list of every tag-able user in the current channel */
        let members = message.channel.members;
        for (const member of members) {
            console.log(member.user.username)
        }
    }
}