module.exports = {
    name: 'removeback',
    aliases: ['rmb', 'rmback'],
    description: 'this is a command to remove the n previous messages',
    async execute(client, message, args) {
        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.ahs('442430651514224640')) {

            if (!args[0]) return message.reply("La commande doit être utilisée ainsi: rmb <nombre de message à delete (max 10)>");
            if (isNaN(args[0])) return message.reply("Le nombre entré est incorrect");

            if (args[0] > 10) return message.reply("Jusqu'à 10 messages peuvent être supprimés à la fois");
            if (args[0] < 1) return message.reply("Vous devez supprimer au moins un message");

            await message.channel.messages.fetch({ limit: Number(args[0]) + 1 }).then(messages => {
                message.channel.bulkDelete(messages);
            });
        } else {
            return message.channel.send('Vous n\'avez pas les permissions pour exécuter cette commande');
        }
    }
}