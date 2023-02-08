const { SlashCommandBuilder } = require('discord.js');
const { roll_dice } = require('./common_func/dice-roll-func.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice-roll')
        .setDescription('Throws a random dice of your selection!')
        .addIntegerOption(option =>
            option.setName('size')
            .setDescription('The number of faces')
            .setMinValue(2)
            .setMaxValue(2000)
            .setRequired(true)),
    async execute(interaction) {
        const cache = interaction.client.dice_cache;
        const user = interaction.user;
        const size = interaction.options.getInteger('size');

        cache.set(user, size);
        await interaction.reply(`${user}` + ' ' + roll_dice(size));
    },
};