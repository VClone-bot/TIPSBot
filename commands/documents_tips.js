const Discord = require('discord.js');

module.exports = {
    name: 'documents_tips',
    aliases: ['statut', 'statuts', 'reglement_interieur', 'ri', 'rib', 'logo', 'documents', 'docs', 'ag', 'cr', 'procuration', 'procu', 'guide', 'facebook', 'fb', 'gazette', 'bertrand', 'agenda', 'site'],
    description: 'envoie les statuts et le règlement intérieur de la TIPS',
    async execute(client, message, args) {

        /** Build the embedded response */
        var embedded_msg = new Discord.MessageEmbed()
            .setTitle('Documents de l\'association')
            .addField("Statuts", "[Lien vers les statuts](https://drive.google.com/file/d/1ks5_zDE_mvZOHinYohDCUPgXCU_aVi7o/view?usp=sharing)")
            .addField("Règlement Intérieur", "[Lien vers le RI](https://drive.google.com/file/d/1t-NU9vlahnHEbmrW0py4cQLEuwd4wnBm/view?usp=sharing)")
            .addField("Compte-rendus d'Assemblées Générales", "[Lien vers les CR d'AG](https://drive.google.com/file/d/1TdQU0zqjTXoFUyxjESP5NWn3ROaprquL/view?usp=sharing)")
            .addField("Modèle de procuration pour les Assemblées Générales", "[Lien vers le modèle](https://drive.google.com/file/d/10E47m8hZaX8jMJnDPiqceU79RZcGY6Lm/view?usp=sharing)")
            .addField("Relevé d'Identité Bancaire", "[Lien vers le RIB](https://drive.google.com/file/d/19-SIwXCHPKUgogcHmPMwaugJh_f4pOEN/view?usp=sharing)")
            .addField('Logo', "[Lien vers le logo](https://drive.google.com/file/d/1ddq-iwaot4Qs9RNxy-octHOQ8LPTzMpY/view?usp=sharing)")
            .addField('Bertrand, le guide de la TIPS', "[Lien vers Bertrand](https://drive.google.com/file/d/11QITvAX_qUHEJMKVy60IyhWJIrkJwOa7/view?usp=sharing)")
            .addField('Guide Discord TIPS', "[Lien vers le guide](https://drive.google.com/file/d/1DOQ8Uz2OtiZ7uA-KSe1zsSS_IO0ekKBG/view?usp=sharing)")
            .addField('Page Facebook TIPS', "[Lien vers la page FB](https://www.facebook.com/tips.improparissaclay)")
            .addField('Expression Libre pour la Gazette', "[Lien vers le Google Docs](https://docs.google.com/document/d/1Iu3p7Gm9H21O-w0eOIim_tldUZBMpa9U2BsxC4bqWMM/edit)")
            .addField('Agenda Google pour les événements', "[Lien vers l'agenda](https://calendar.google.com/calendar/u/1?cid=NHZocWR2aXF1bDU4YW5vaThsYnUzZ2YwdjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)")
            .addField('Site Internet de la TIPS', "Soon™")

        /** Send it */
        return message.channel.send(embedded_msg)
    }
}