const fs = require('node:fs');
const path = require('node:path');
const Keyv = require('keyv');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
//getting token
require('dotenv').config();
const token = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

client.keyv = new Keyv();
client.dice_cache = new Collection();
client.commands = new Collection();

const cmdPath = path.join(__dirname, 'commands');
const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));

for (const file of cmdFiles) {
    const filePath = path.join(cmdPath, file);
    const command = require(filePath);

    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    //console.log(interaction);

    const command = client.commands.get(interaction.commandName);

    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
    }

    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);

