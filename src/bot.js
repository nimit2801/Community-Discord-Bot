require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

// To do
// 1. Make Channels
//  a. Make Channels done
//  b. Add two people in a channel
//  c. Make a role for them and send them messages
// 2. Suggest topics for the user
// 3. Delete them after a interval

let PREFIX = '!';

client.once('ready', () => {
  console.log('The bot is ready lets go!');
});

// Helper fucntions for console.log
function log(args) {
  console.log(args);
}

// To get user ID of the members online in the guild where the command was used :D
async function getUserID(message) {
  let userId = [];
  await message.guild.members.cache.map((user) => {
    // || user.presence.status === 'online' || user.presence.status === 'idle'
    if (
      user.user.bot === false &&
      (user.presence.status == 'online' || user.presence.status == 'idle')
    ) {
      log(
        `${user.id}: ${user.user.username} ${user.user.discriminator} ${user.presence.status}`
      );
      userId.push(user.id);
    }
  });
  return userId;
}

// Random Number generator: Generates 10 random numbers between 0 and max
const random = async (max = 50) => {
  log(max);
  let random_ = [];
  let number;
  for (let i = 0; random_.length != 10; i++) {
    number = Math.floor(Math.random() * (max - 1));
    if (!random_.includes(number)) random_.push(number);
  }
  log(`random = ${random_} ${random_.length}`);
  return random_;
};

// Make channels
const makeChannels = async (message) => {
  let catChannel = await message.guild.channels.create(`Comm Talks`, {
    type: 'category',
    reason: 'To chat with community members',
  });
  log('Category channel created');
  // log(catChannel);
  let channel = [];
  for (let i = 0; i < 5; i++) {
    channel[i] = await message.guild.channels.create(`Comm Talks ${i + 1}`, {
      topic:
        'This channel helps random people from the community to network :D',
      parent: catChannel,
      reason: 'To chat with community members',
    });
    log('channel create' + (i + 1));
  }
  // log(channel);
  setTimeout(async function fun() {
    for (let i = 0; i < 5; i++) {
      channel[i].delete();
      log(`channel ${i + 1} deleted!`);
    }
    log('All Text Channels Deleted!');
  }, 5000);
  setTimeout(async function fun() {
    await catChannel.delete('some reason :D');
    log('Category Channel Deleted!');
  }, 10000);
};
// Listener that listens to messages :D
client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    let [command] = message.content.split(' ');
    switch (command) {
      case `${PREFIX}match`:
        {
          try {
            let userId = await getUserID(message);
            log(userId.length);
            let random_ = await random(userId.length);
            log(random_);
            if (message.guild) message.channel.send('working :D');
            else {
              message.channel.send('Please use this command in a server!');
            }
          } catch (error) {
            log(error);
          }
        }
        break;
      case `${PREFIX}make`:
        {
          try {
            makeChannels(message);
            if (message.guild) message.channel.send('working :D');
            else {
              message.channel.send('Please use this command in a server!');
            }
          } catch (error) {
            log(error);
          }
        }
        break;
      default:
        {
          let wrongEmbed = {
            color: 0xff001a,
            title: 'Wrong Command',
            description: `Wrong command were used please use ${PREFIX}help for more info!`,
          };
          message.channel.send({ embed: wrongEmbed });
        }
        break;
    }
  }
});

client.login(process.env.BOT_TOKEN);
