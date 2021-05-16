require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

let PREFIX = '$';

client.once('ready', () => {
  console.log('The bot is ready lets go!');
});

client.on('message', async (message) => {
  if (message.content.startsWith(`${PREFIX}`)) {
    let roles = message.guild.roles.cache;
    let channels = message.guild.channels.cache;
    let [command, args] = message.content.split(' ');
    if (message.content.startsWith(`${PREFIX}deler`)) {
      roles.forEach(async (role) => {
        if (role.name.startsWith('comms')) await role.delete();
        console.log(role.name);
      });
      message.channel.send(`All Roles stasrting with ${args} were deleted!`);
    }
    if (message.content.startsWith(`${PREFIX}delec`)) {
      console.log(args);
      channels.forEach(async (channel) => {
        // await channel.delete();
        if (channel.name.startsWith('comms')) console.log(channel.name);
      });
    }
  }
});

client.login(process.env.BOT_TOKEN_);
