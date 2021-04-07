module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    cooldown: 3,
    async execute(client, message, args) {
        return message.channel.send('pong');
    }
}