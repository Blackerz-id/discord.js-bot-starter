// Your main source code of bot

const discord = require("discord.js");
const client = new discord.Client();

const prefix = "!"

client.on("ready", () => {
    console.log(client.user.username + " is ready!");
})

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.substring(prefix.length, message.content.length).split(" ")
    const command = args[0];
    args.shift()
    if (command == "ping") {
        return message.channel.send("pong!");
    } else if(command == "say") {
        return message.channel.send(args.splice(0).join(" "))
    }
})

client.login("ODMxODAxNzc4OTc4NDIyNzg0.YHahxg.Qzz6CwR8w83uuHvYRIxUOIfwExI") // bot token