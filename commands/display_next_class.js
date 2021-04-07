const Discord = require('discord.js')
const fs = require('fs');

module.exports = {
    name: 'display_next_class',
    aliases: ['dclass', 'dcours', 'nextcours'],
    cooldown: 5,
    async execute(client, message, args) {

        /** Fetch next classes data from file */
        const classes_data = fs.readFileSync('./files/classes.json');
        var classes = JSON.parse(classes_data);

        /** Find next class on Tuesday with Robin */
        if (classes.Mardi.length > 0) {
            var nm = classes.Mardi[0];
            for (const m of classes.Mardi) {
                /** Why is javascript f*cking unable to use different f*cking date formats than YYYY-MM-DD for f*ck's sake */
                const args = m.date.split(/ +/)[1];
                const curr_args = nm.date.split(/ +/)[1];

                const args_date = args.split('-');
                const curr_args_date = curr_args.split('-');

                const day = args_date[0];
                const month = args_date[1];
                const year = args_date[2];

                const curr_day = curr_args_date[0];
                const curr_month = curr_args_date[1];
                const curr_year = curr_args_date[2];

                const date = new Date(`${year}-${month}-${day}`);
                const curr_date = new Date(`${curr_year}-${curr_month}-${curr_day}`);

                if (date < curr_date) {
                    nm = m;
                }
            }
        }

        /** Find next class on Thursday with Robin */
        if (classes.Jeudi.length > 0) {
            var nj = classes.Jeudi[0];
            for (const j of classes.Jeudi) {
                const args = j.date.split(/ +/)[1];
                const curr_args = nj.date.split(/ +/)[1];

                const args_date = args.split('-');
                const curr_args_date = curr_args.split('-');

                const day = args_date[0];
                const month = args_date[1];
                const year = args_date[2];

                const curr_day = curr_args_date[0];
                const curr_month = curr_args_date[1];
                const curr_year = curr_args_date[2];

                const date = new Date(`${year}-${month}-${day}`);
                const curr_date = new Date(`${curr_year}-${curr_month}-${curr_day}`);

                if (date < curr_date) {
                    nj = j;
                }
            }
        }

        /** Find next class on Thursday with Gibbons */
        if (classes.Gibbons.length > 0) {
            var ng = classes.Gibbons[0];
            for (const g of classes.Gibbons) {
                const args = g.date.split(/ +/)[1];
                const curr_args = ng.date.split(/ +/)[1];

                const args_date = args.split('-');
                const curr_args_date = curr_args.split('-');

                const day = args_date[0];
                const month = args_date[1];
                const year = args_date[2];

                const curr_day = curr_args_date[0];
                const curr_month = curr_args_date[1];
                const curr_year = curr_args_date[2];

                const date = new Date(`${year}-${month}-${day}`);
                const curr_date = new Date(`${curr_year}-${curr_month}-${curr_day}`);

                if (date < curr_date) {
                    ng = g;
                }
            }
        }

        /** Build the embedded response */
        var embedded_msg = new Discord.MessageEmbed()
            .setTitle('Agenda Cours TIPS')
            .setURL('https://calendar.google.com/calendar/u/1?cid=NHZocWR2aXF1bDU4YW5vaThsYnUzZ2YwdjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ');

        if (nm)
            embedded_msg.addFields({ name: 'Prochain cours Mardi Robin', value: `${nm.name}, ${nm.date}, ${nm.lieu}` });
        if (nj)
            embedded_msg.addFields({ name: 'Prochain cours Jeudi Robin', value: `${nj.name}, ${nj.date}, ${nj.lieu}` });
        if (ng)
            embedded_msg.addFields({ name: 'Prochain Jeudi Gibbons', value: `${ng.name}, ${ng.date}, ${ng.lieu}` });

        /** Send it */
        return message.channel.send(embedded_msg);
    }
}