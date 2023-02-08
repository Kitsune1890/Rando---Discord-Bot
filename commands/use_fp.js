const { SlashCommandBuilder } = require('discord.js');
const { roll_dice } = require('./common_func/dice-roll-func');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('use-fp')
        .setDescription('Use your fate point.'),
    async execute(interaction) {
        const user = interaction.user;
        const keyv = interaction.client.keyv;
        const cache = interaction.client.dice_cache;
        const size = cache.get(user);

        if (cache.get(user) === undefined) {
            await interaction.reply('You haven\'t rolled a dice yet!');
        }
        else if (await keyv.get(user) === undefined || await keyv.get(user)) {
            await keyv.set(user, false);
            await interaction.reply(`${user} used a fate point!`);

            //generate a new dice roll
            cache.set(user, size);
            await interaction.followUp(`${user}` + ' ' + roll_dice(size));
        }
        else {
            interaction.reply('You already used your fate point!');
        }
    },
};