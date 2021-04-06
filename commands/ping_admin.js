module.exports = {
    name: 'ping_admin',
    description: 'this is a ping command to test roles',
    async execute(client, message, args) {
        if (message.member.roles.cache.has('828828294970605648')) {
            return message.channel.send('pong');
        } else {
            return message.channel.send('Vous n\'avez pas les permissions pour exécuter cette commande');
        }
    }
}