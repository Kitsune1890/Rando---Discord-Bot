const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check-fp')
        .setDescription('Check if you have used your fp or not.'),
    async execute(interaction) {
        const user = interaction.user;
        const keyv = interaction.client.keyv;

        if (await keyv.get(user) === undefined) {
            await keyv.set(user, true);
            await interaction.reply('You have a fate point!');
        }
        else if (await keyv.get(user)) {
            await interaction.reply('You have a fate point!');
        }
        else {
            await interaction.reply('You don\'t have a fate point!');
        }
    },
};