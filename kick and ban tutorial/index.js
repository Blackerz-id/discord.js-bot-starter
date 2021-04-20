// Your main source code of bot

const discord = require("discord.js");
const client = new discord.Client();

const prefix = "!" // change to anything you wanted for the best bot


client.on("ready", () => {
    console.log(client.user.username + " is ready!");
})


client.on("message", async (message) => {
    if (message.author.bot) return; // ignore bot messages
    if (!message.content.startsWith(prefix)) return; // ignore message without prefix

    const args = message.content.slice(prefix.length).split(/ +/g)
    const command = args.shift().toLowerCase();

    if (command == "ping") {
        return message.channel.send("pong!");
    } else if (command == "say") {
        return message.channel.send(args.splice(0).join(" "))
    } else if (command == "kick") {
        if (!message.guild) return; // ignore dm message for this command
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I dont have kick permission");
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You dont have kick permission to use this command");

        var userArgs = args[0];
        var optReason = args.slice(1).join(" ");
        if (!userArgs) return message.reply("Usage: `!kick <user> [reason]`");
        const member = message.guild.members.cache.get(userArgs.replace(/</g, "").replace(/@/g, "").replace(/!/g, "").replace(/>/g, ""));
        if (!member) return message.reply(`Member not found, \`${userArgs}`);

        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply(`You cannot kick ${member} for having same/higher roles`);
        if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(`Im unable to kick ${member} for having same/higher role than me`);

        member.kick(optReason || `Command used by ${message.author.tag}`).then(result => {
            return message.channel.send(`Success kicked \`${member.user.tag}\` from this server`)
        }).catch(err => {
            console.error(err);
            return message.channel.send("An error occured, please check output logs!")
        })
    } else if (command == "ban") {
        if (!message.guild) return; // ignore dm message for this command
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("I dont have ban permission");
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You dont have ban permission to use this command");

        var userArgs = args[0];
        var optReason = args.slice(1).join(" ");
        if (!userArgs) return message.reply("Usage: `!ban <user> [reason]`");
        const member = message.guild.members.cache.get(userArgs.replace(/</g, "").replace(/@/g, "").replace(/!/g, "").replace(/>/g, ""));
        if (!member) return message.reply(`Member not found, \`${userArgs}`);

        if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply(`You cannot ban ${member} for having same/higher roles`);
        if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(`Im unable to ban ${member} for having same/higher role than me`);

        member.ban({reason: optReason || `Command used by ${message.author.tag}`}).then(result => {
            return message.channel.send(`Success banned \`${member.user.tag}\` from this server`);
        }).catch(err => {
            console.error(err);
            return message.channel.send("An error occurred, please check your output logs!");
        })

    }

})





client.login("BOT TOKEN HERE") // bot token
