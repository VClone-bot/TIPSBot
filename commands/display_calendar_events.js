const Discord = require('discord.js')

module.exports = {
    name: 'display_calendar_events',
    aliases: ['devent', 'dates'],
    async execute(client, message, args) {
        /** Fetch next events data from file */
        const events = require('../files/events.json');

        /** Find next match */
        var nm = events.Matchs[0];
        for (const m of events.Matchs) {
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

        /** Find next cabaret */
        var nc = events.Cabarets[0];
        for (const c of events.Cabarets) {
            const args = c.date.split(/ +/)[1];
            const curr_args = nc.date.split(/ +/)[1];

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
                nc = c;
            }
        }

        /** Build the embedded response */
        var embedded_msg = new Discord.MessageEmbed()
            .setTitle('Agenda TIPS')
            .setURL('https://calendar.google.com/calendar/u/1?cid=NHZocWR2aXF1bDU4YW5vaThsYnUzZ2YwdjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ')
            .addFields({ name: 'Prochain match', value: `${nm.name}, ${nm.date}, ${nm.lieu}` }, { name: 'Prochain cabaret', value: `${nc.name}, ${nc.date}, ${nc.lieu}` })

        /** Send it */
        message.channel.send(embedded_msg)
    }
}