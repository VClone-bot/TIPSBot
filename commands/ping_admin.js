module.exports = {
    name: 'ping_admin',
    description: 'this is a ping command to test roles',
    execute(message, args) {
        if (message.member.roles.cache.has('828828294970605648')) {
            message.channel.send('pong');
        } else {
            message.channel.send('Vous n\'avez pas les permissions pour exécuter cette commande');
        }
    }
}