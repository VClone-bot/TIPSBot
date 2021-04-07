module.exports = {
    name: 'removeback',
    aliases: ['rmb', 'rmback'],
    description: 'this is a command to remove the n previous messages',
    cooldown: 3,
    async execute(client, message, args) {
        /** Check if monke has sufficient privileges */
        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.ahs('442430651514224640')) {

            /** Monkecheck args */
            if (!args[0]) return message.reply("la commande doit être utilisée ainsi: rmb <nombre de message à delete (max 10)>");
            if (isNaN(args[0])) return message.reply("le nombre entré est incorrect");

            if (args[0] > 10) return message.reply("jusqu'à 10 messages peuvent être supprimés à la fois");
            if (args[0] < 1) return message.reply("vous devez supprimer au moins un message");

            /** Fetch messages that needs to be deleted and delete them */
            await message.channel.messages.fetch({ limit: Number(args[0]) + 1 }).then(messages => {
                message.channel.bulkDelete(messages);
            });
        } else {
            return message.channel.reply('vous n\'avez pas les permissions pour exécuter cette commande');
        }
    }
}