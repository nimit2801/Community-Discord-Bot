require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

let PREFIX = '$';

client.once('ready', () => {
  console.log('The bot is ready lets go!');
});

client.on('message', async (message) => {
  if (message.content.startsWith(`${PREFIX}dele`)) {
    let roles = message.guild.roles.cache;
    let [command, args] = message.content.split(' ');
    roles.forEach(async (role) => {
      if (role.name.startsWith('comms')) await role.delete();
      console.log(role.name);
    });
    message.channel.send(`All Roles stasrting with ${args} were deleted!`);
  }
});

client.login(process.env.BOT_TOKEN_);
