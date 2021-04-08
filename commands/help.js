const Discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: [],
    description: 'this command prints all of this bot\'s commands',
    cooldown: 2,
    async execute(client, message, args) {

        /** Build embedded response */
        var embedded_msg = new Discord.MessageEmbed()
            .setTitle('Agenda TIPS')
            .setURL('https://calendar.google.com/calendar/u/1?cid=NHZocWR2aXF1bDU4YW5vaThsYnUzZ2YwdjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ')
            .addFields({
                    name: "--dall <argument optionnel 1> <argument optionnel 2> <argument optionnel 3>, les arguments doivent être \"Match\" ou \"Cabaret\" ou \"Extérieur\"",
                    value: "Permet d'afficher tous les événements à venir (matchs/cabarets etc...)"
                },

                {
                    name: "--devent",
                    value: "Permet d'afficher les prochains événement"
                },

                {
                    name: "--cours <argument optionnel 1> <argument optionnel 2> <argument optionnel 3>, les arguments doivent être \"Mardi\" ou \"Jeudi\" ou \"Gibbons\"",
                    value: "Permet d'afficher tous les cours à venir"
                },

                {
                    name: "--nextcours",
                    value: "Permet d'afficher les prochains cours à venir"
                },

                {
                    name: "--documents",
                    value: "Permet d'obtenir un lien vers tous les documents +/- importants de l'association"
                },

                {
                    name: "--ping",
                    value: "Permet de ping le bot"
                },

                {
                    name: "--suggest <Texte de la suggestion",
                    value: "Permet de poster une suggestion dans le chan dédié à cela, les suggestions non sérieuses seront supprimées, évitez de troll svp"
                }
            );

        if (message.member.roles.cache.has('828828294970605648') ||
            message.member.roles.cache.has('442464001264189450') ||
            message.member.roles.cache.has('442430651514224640')) {
            embedded_msg.addFields({
                    name: "--adde <type d'événement (Match/Cabaret/Extérieur)> <jour de la semaine de l'événement> <date de l'événément au format JJ-MM-AAAA",
                    value: "Permet d'ajouter un événement au calendrier des événements"
                },

                {
                    name: "--clearev <argument de date optionnel au format JJ-MM-AAAA>",
                    value: "Permet de retirer tous les événements passés, ou antérieurs à la date donnée en argument"
                },

                {
                    name: "--rme <id de l'événement à supprimer>",
                    value: "Permet de retirer un événement spécifique du calendrier, --dall pour avoir la liste des événements et leur IDs"
                },

                {
                    name: "--addc <Nom du cours (Mardi/Jeudi/Gibbons)> <jour de la semaine du cours> <date du cours au format JJ-MM-AAAA> <heure du cours au format HH:MM>",
                    value: "Permet d'ajouter un cours au calendrier des cours"
                },

                {
                    name: "--clearc",
                    value: "Permet de retirer tous les cours antérieurs à la date actuelle du calendrier des cours"
                },

                {
                    name: "--rmc <id du cours à supprimer>",
                    value: "Permet de retirer un cours du calendrier des cours, utiliser --cours pour afficher tous les cours et leurs IDs"
                },

                {
                    name: "--rmb <nombre de message à delete (entre 1 et 10)>",
                    value: "Permet de retirer les n derniers messages du channel actuel"
                },

                {
                    name: "--mkvote <Message du vote>",
                    value: "Permet de créer un vote sur le channel actuel"
                }
            );
        }

        /** Send the response to the user in DM */
        const id = message.author.id;
        client.users.cache.get(id).send(embedded_msg);
    }
}