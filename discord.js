const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let startTime = null;

client.once('ready', () => {
    startTime = new Date();
    console.log('Bot is ready');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'hello') {
        await interaction.reply('hello');
    } else if (commandName === 'ping') {
        const embed = new EmbedBuilder()
            .setTitle('Ping!')
            .setDescription(`Latency: ${Math.round(client.ws.ping)}ms`)
            .setColor('Blue')
            .setThumbnail('https://images-ext-1.discordapp.net/external/rjM-93jAkNMPY5X8DHOa88ELw1s6EcEetWm8-3KYFgk/https/cdn.discordapp.com/emojis/973344452938706984.png');
        await interaction.reply({ embeds: [embed] });
    } else if (commandName === 'uptime') {
        const currentTime = new Date();
        const uptimeDuration = currentTime - startTime;
        const days = Math.floor(uptimeDuration / (24 * 60 * 60 * 1000));
        const hours = Math.floor((uptimeDuration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((uptimeDuration % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((uptimeDuration % (60 * 1000)) / 1000);

        const embed = new EmbedBuilder()
            .setTitle('Uptime')
            .setDescription(`Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`)
            .setColor('Green')
            .setThumbnail('https://images-ext-1.discordapp.net/external/v64QOs2-NugFl499GDZRqQgaZljJp81_E_A5L9ZYuIs/https/cdn.discordapp.com/emojis/905750668894154832.png');
        await interaction.reply({ embeds: [embed] });
    } else if (commandName === 'say') {
        const message = interaction.options.getString('message');
        await interaction.deferReply({ ephemeral: true });
        await interaction.deleteReply();
        await interaction.channel.send(message);
    }
});

client.login('OTU3MTk3NTU1OTMyOTg3NDAy.Gf66jW.OIOpLAyd9HLXYr-D6u4m-28wgHwWRxrjRq_oWo');

// Register commands (run this separately during setup)
const { REST, Routes } = require('discord.js');
const rest = new REST({ version: '10' }).setToken('OTU3MTk3NTU1OTMyOTg3NDAy.Gf66jW.OIOpLAyd9HLXYr-D6u4m-28wgHwWRxrjRq_oWo');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands('YOUR_CLIENT_ID', 'YOUR_GUILD_ID'),
            { body: [
                new SlashCommandBuilder().setName('hello').setDescription('Says hello'),
                new SlashCommandBuilder().setName('ping').setDescription('Responds with pong and the bot\'s latency'),
                new SlashCommandBuilder().setName('uptime').setDescription('Shows the bot\'s uptime'),
                new SlashCommandBuilder().setName('say').setDescription('Sends a custom message').addStringOption(option =>
                    option.setName('message')
                        .setDescription('The message to send')
                        .setRequired(true)),
            ].map(command => command.toJSON()) },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
