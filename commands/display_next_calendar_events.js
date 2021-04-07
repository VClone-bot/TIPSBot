const Discord = require('discord.js')
const fs = require('fs');

module.exports = {
    name: 'display_next_calendar_events',
    aliases: ['devent', 'nextdates'],
    cooldown: 5,
    async execute(client, message, args) {

        /** Fetch next events data from file */
        const events_data = fs.readFileSync('./files/events.json');
        var events = JSON.parse(events_data);

        /** Find next match */
        if (events.Matchs.length > 0) {
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
        }

        /** Find next cabaret */
        if (events.Cabarets.length > 0) {
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
        }

        /** Find next exterieur */
        if (events.Exterieurs.length > 0) {
            var ne = events.Exterieurs[0];
            for (const e of events.Exterieurs) {
                const args = e.date.split(/ +/)[1];
                const curr_args = ne.date.split(/ +/)[1];

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
                    ne = e;
                }
            }
        }

        /** Build the embedded response */
        var embedded_msg = new Discord.MessageEmbed()
            .setTitle('Agenda TIPS')
            .setURL('https://calendar.google.com/calendar/u/1?cid=NHZocWR2aXF1bDU4YW5vaThsYnUzZ2YwdjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ');

        if (nm)
            embedded_msg.addFields({ name: 'Prochain match', value: `${nm.name}, ${nm.date}, ${nm.lieu}` });
        if (nc)
            embedded_msg.addFields({ name: 'Prochain cabaret', value: `${nc.name}, ${nc.date}, ${nc.lieu}` });
        if (ne)
            embedded_msg.addFields({ name: 'Prochain extérieur', value: `${ne.name}, ${ne.date}, ${ne.lieu}` });

        /** Send it */
        return message.channel.send(embedded_msg);
    }
}