const Discord = require('discord.js')
const { execute } = require('./ag_poll')

module.exports = {
    name: 'random_member',
    aliases: ['rd_member', 'memberroll'],
    description: 'tag un membre du discord aléatoire',
    async execute(client, message, args) {

        /** Get the list of every tag-able user in the current channel */
        const list = client.guilds.cache.get("442109249389199362");
        list.members.cache.array().forEach(member => {
            console.log(member.tag)
        });
    }
}