const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    aliases: ['meteo'],
    async execute(client, message, args) {

        weather.find({ search: args.join(" "), degreeType: 'C' }, function(error, result) {
            if (error) return message.channel.send(error);
            if (!args[0]) return message.channel.send('Spécifiez une ville')

            if (result === undefined || result.length === 0) return message.channel.send('Lieu invalide');

            let currentDate = new Date();

            var current = result[0].current;
            var location = result[0].location;

            var f = result[0].forecast;

            for (const d of f) {
                const weatherinfo = new Discord.MessageEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor(`Prévisions météo pour ${current.observationpoint}`)
                    .setColor(0x111111)
                    .addField('Date', `${d.day}, ${d.date}`)
                    .addField('Temps', `${d.skytextday}`)
                    .addField('Température max', `${d.high}°`, true)
                    .addField('Température min', `${d.low}°`, true)
                message.channel.send(weatherinfo)
            }
        });
    }
}