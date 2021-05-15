require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

/**
 * TODO: 1. Make Channels
//*  TODO: a. Make Channels done
//  TODO: b. Add two people in a channel
//  TODO: c. Make a role for them and send them messages
// TODO: 2. Suggest topics for the user
// TODO: 3. Delete them after a interval
*/
let PREFIX = '!';

client.once('ready', () => {
  console.log('The bot is ready lets go!');
});

// Helper fucntions for console.log
function log(args) {
  console.log(args);
}

async function noOfGuildMembersOnlineIdle(message) {
  let userId = [];
  await message.guild.members.cache.map((user) => {
    if (
      user.user.bot === false &&
      (user.presence.status == 'online' || user.presence.status == 'idle')
    ) {
      userId.push(user.id);
    }
  });
  return userId.length;
}
// To get user ID of the members online in the guild where the command was used :D
async function getUserID(message, roles, random_) {
  let userId = [];
  let i = 0;
  let m = 1;
  let j = 0;
  log(random_);
  await message.guild.members.cache.map((user) => {
    // || user.presence.status === 'online' || user.presence.status === 'idle'
    if (
      user.user.bot === false &&
      (user.presence.status == 'online' || user.presence.status == 'idle')
    ) {
      if (random_.includes(i)) {
        // user.roles.add(roles[j]);
        if (m % 2 == 0) {
          j++;
        }
        m = m + 1;
        log(j);
      }
      log(
        `${user.id}: ${user.user.username} ${user.user.discriminator} ${user.presence.status}`
      );
      userId.push(user.id);
    }
    i = i + 1;
  });
  return userId;
}

// Random Number generator: Generates 10 random numbers between 0 and max
const random = async (message) => {
  let max = (await noOfGuildMembersOnlineIdle(message)) || 50;
  log(max);
  let random_ = [];
  let number;
  let arrL = 10 >= max ? (max % 2 == 0 ? max - 2 : max - 1) : 10;
  console.log(arrL);
  for (let i = 0; random_.length != arrL; i++) {
    number = Math.floor(Math.random() * (max - 1));
    if (!random_.includes(number)) random_.push(number);
  }
  console.log(random_);
  random_.sort();
  console.log(random_);
  return random_;
};

// Make channels
const makeChannels = async (message) => {
  let catChannel = await message.guild.channels.create(`Comm Talks`, {
    type: 'category',
    reason: 'To chat with community members',
  });
  log('Category channel created');
  await catChannel.overwritePermissions([
    { id: '797159754701996072', deny: 'VIEW_CHANNEL' },
  ]);
  // log(catChannel);

  // creating 5 Text channels
  // let channel = [];
  // for (let i = 0; i < 5; i++) {
  //   channel[i] = await message.guild.channels.create(`Comm Talks ${i + 1}`, {
  //     topic:
  //       'This channel helps random people from the community to network :D',
  //     parent: catChannel,
  //     reason: 'To chat with community members',
  //   });
  //   log('channel create' + (i + 1));
  // }

  // Deleting 5 Text channels
  // setTimeout(async function fun() {
  //   for (let i = 0; i < 5; i++) {
  //     channel[i].delete();
  //     log(`channel ${i + 1} deleted!`);
  //   }
  //   log('All Text Channels Deleted!');
  // }, 5000);

  // Deletes Category Channel
  setTimeout(async function fun() {
    await catChannel.delete('some reason :D');
    log('Category Channel Deleted!');
  }, 20000);
};

// create 5 roles for the different channels
const createRoles = async (message) => {
  let roles = [];
  let colors = ['GREEN', 'BLUE', 'PURPLE', 'ORANGE', 'GOLD'];
  for (let i = 0; i < 5; i++) {
    roles[i] = await message.guild.roles.create({
      data: { name: `comms ${i + 1}`, color: `${colors[i]}` },
    });
  }
  log('roles created');
  // setTimeout(function fun() {
  //   roles.forEach((role) => {
  //     role.delete();
  //   });
  //   log('deleted all roles');
  // }, 20000);
  return roles;
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
            let roles = await createRoles(message);
            log(roles);
            let random_ = await random(message);
            let userId = await getUserID(message, roles, random_);
            log(userId.length);
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
      case `${PREFIX}role`:
        {
          try {
            createRoles(message);
            if (message.guild) message.channel.send('working :D');
            else {
              message.channel.send('Please use this command in a server!');
            }
          } catch (error) {
            log(error);
          }
        }
        break;
      case `${PREFIX}userId`:
        {
          try {
            let random_ = await random(message);
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
